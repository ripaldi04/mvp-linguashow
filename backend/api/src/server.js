import http from 'http';
import dotenv from 'dotenv';
import app from './app.js';
import { initDb } from './sequelize/models/index.js';
import { setupPracticeStream } from './ws/practiceStream.js';

dotenv.config();

const PORT = process.env.PORT || 4000;

const server = http.createServer(app);

initDb()
  .then(() => {
    setupPracticeStream(server);
    server.listen(PORT, () => {
      console.log(`API listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('DB init failed', err);
    process.exit(1);
  });


