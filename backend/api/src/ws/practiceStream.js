import WebSocket, { WebSocketServer } from 'ws';
import url from 'url';

export function setupPracticeStream(server) {
  const wss = new WebSocketServer({ noServer: true });

  server.on('upgrade', (request, socket, head) => {
    const { pathname, query } = url.parse(request.url, true);
    if (!pathname) return socket.destroy();
    if (pathname.startsWith('/progress/') && pathname.endsWith('/practice-stream')) {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request, query);
      });
    } else {
      socket.destroy();
    }
  });

  wss.on('connection', (clientWs, request, query) => {
    const aiUrl = process.env.AI_SERVICE_WS_URL || 'ws://127.0.0.1:8000/analyze-stream';
    const aiWs = new WebSocket(aiUrl);

    aiWs.on('open', () => {
      // Optionally send target_text as first message if provided via query
      if (query && query.target_text) {
        aiWs.send(JSON.stringify({ target_text: query.target_text }));
      }
    });

    // Forward binary/audio chunks and control messages to AI
    clientWs.on('message', (message, isBinary) => {
      if (aiWs.readyState === WebSocket.OPEN) {
        aiWs.send(message, { binary: isBinary });
      }
    });

    clientWs.on('close', () => aiWs.close());
    clientWs.on('error', () => aiWs.close());

    // Relay realtime analysis from AI back to client
    aiWs.on('message', (message, isBinary) => {
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(message, { binary: isBinary });
      }
    });

    aiWs.on('close', () => {
      if (clientWs.readyState === WebSocket.OPEN) clientWs.close();
    });

    aiWs.on('error', (err) => {
      console.error('AI WS error', err);
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.close(1011, 'AI service error');
      }
    });
  });

  return wss;
}


