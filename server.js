import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import compression from 'compression';
import bodyParser from 'body-parser';
import { router } from './routes';
import { logger } from './logger';

require('dotenv').config();

const app = express();
mongoose.Promise = global.Promise;
let server;

// Middleware
app.use(compression({ level: 9, threshold: 0 }));
app.use(cors());
app.use(router);
app.use(bodyParser.json());
app.use(morgan('common', { stream: logger.stream }));
// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use((err, req, res) => {
  logger.error(err);
  res.status(500).json({ error: 'Something went wrong' }).end();
});

function runServer(databaseUrl = process.env.DATABASE_URL, port = process.env.PORT) {
  return new Promise((resolve, reject) => {
    /* eslint-disable consistent-return */
    mongoose.connect(databaseUrl, (err) => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        logger.log(`Your app is listening on port ${port}`);
        resolve();
      })
      .on('error', () => {
        mongoose.disconnect();
        reject();
      });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() =>
    new Promise((resolve, reject) => {
      logger.log('Closing server');
      server.close((err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    }),
  );
}

if (require.main === module) {
  runServer().catch(err => logger.error(err));
}

module.exports = { app, runServer, closeServer };
