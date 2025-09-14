from fastapi import FastAPI, File, UploadFile, Form
from pydantic import BaseModel
from typing import List, Optional
import tempfile
import whisper
import re
from difflib import SequenceMatcher
import subprocess
import os
import requests

app = FastAPI()
model = whisper.load_model("large")  # base, small, medium, large

class WordResult(BaseModel):
    word: str
    status: str
    expected: Optional[str] = None
    position: Optional[int] = None

class AnalyzeOutput(BaseModel):
    transcribed_text: str
    accuracy_score: float
    fluency_score: float
    words: List[WordResult]

def normalize_ar(text: str) -> str:
    if not text:
        return ""
    diacritics = re.compile(r"[\u0610-\u061A\u064B-\u065F\u0670-\u06ED]")
    text = diacritics.sub("", text)
    text = text.replace("\u0640", "")
    text = re.sub(r"[\u0622\u0623\u0625]", "\u0627", text)
    text = text.replace("\u0649", "\u064A")
    return text.strip()

def align_words(ref: List[str], hyp: List[str]) -> List[WordResult]:
    sm = SequenceMatcher(a=ref, b=hyp, autojunk=False)
    out: List[WordResult] = []
    for tag, i1, i2, j1, j2 in sm.get_opcodes():
        if tag == 'equal':
            for k in range(i2 - i1):
                w = ref[i1 + k]
                out.append(WordResult(word=w, status='correct', expected=w, position=i1 + k))
        elif tag == 'replace':
            for k in range(max(i2 - i1, j2 - j1)):
                exp = ref[i1 + k] if (i1 + k) < i2 else None
                got = hyp[j1 + k] if (j1 + k) < j2 else None
                if exp and got:
                    out.append(WordResult(word=got, status='wrong', expected=exp, position=i1 + k))
                elif exp:
                    out.append(WordResult(word='', status='missing', expected=exp, position=i1 + k))
                elif got:
                    out.append(WordResult(word=got, status='extra', expected=None, position=None))
        elif tag == 'delete':
            for k in range(i1, i2):
                out.append(WordResult(word='', status='missing', expected=ref[k], position=k))
        elif tag == 'insert':
            for k in range(j1, j2):
                out.append(WordResult(word=hyp[k], status='extra', expected=None, position=None))
    return out

def calc_scores(ref: List[str], results: List[WordResult]) -> (float, float):
    total = max(1, len(ref))
    correct = sum(1 for r in results if r.status == 'correct' and r.expected)
    accuracy = correct / total
    extras = sum(1 for r in results if r.status == 'extra')
    missing = sum(1 for r in results if r.status == 'missing')
    wrong = sum(1 for r in results if r.status == 'wrong')
    penalty = 0.05 * extras + 0.05 * missing + 0.03 * wrong
    fluency = max(0.0, min(1.0, 0.9 - penalty))
    return accuracy, fluency

@app.post("/analyze", response_model=AnalyzeOutput)
async def analyze(
    audio_file: Optional[UploadFile] = File(None),
    audio_url: Optional[str] = Form(None),
    target_text: str = Form(...)
):
    tmp_path = None
    try:
        # Jika user mengirim file upload
        if audio_file:
            suffix = os.path.splitext(audio_file.filename)[1] or ".mp3"
            with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
                tmp.write(await audio_file.read())
                tmp_path = tmp.name

        # Jika user mengirim URL audio
        elif audio_url:
            response = requests.get(audio_url)
            if response.status_code != 200:
                return {"error": "Gagal download audio dari URL"}
            suffix = os.path.splitext(audio_url)[1] or ".mp3"
            with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
                tmp.write(response.content)
                tmp_path = tmp.name
        else:
            return {"error": "Harus mengirim audio_file atau audio_url"}

        # Transkripsi audio dengan Whisper (ffmpeg otomatis decode)
        result = model.transcribe(tmp_path, language="ar")
        transcript = result["text"]

        # Analisis kata
        ref_words = [w for w in normalize_ar(target_text).split() if w]
        hyp_words = [w for w in normalize_ar(transcript).split() if w]
        word_results = align_words(ref_words, hyp_words)
        accuracy, fluency = calc_scores(ref_words, word_results)

        return AnalyzeOutput(
            transcribed_text=transcript,
            accuracy_score=round(accuracy, 4),
            fluency_score=round(fluency, 4),
            words=word_results
        )

    except subprocess.CalledProcessError:
        return {"error": "Gagal memproses audio. Pastikan file audio valid dan ffmpeg terpasang."}
    except Exception as e:
        return {"error": str(e)}
    finally:
        if tmp_path and os.path.exists(tmp_path):
            os.remove(tmp_path)
