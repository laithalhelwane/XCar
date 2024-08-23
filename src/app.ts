import express from 'express';
import cors from 'cors';
import passport from 'passport';
import jwtAuth from './util/passport';
import routes from './routes';
declare global {
  namespace Express {
    interface User {
      _id: string;
      sessionId: string;
    }
  }
}
export default function createApp() {
  jwtAuth(passport);
  const app = express();

  app.use(
    cors({
      origin: '*',
      methods: 'GET,PATCH,POST,DELETE',
    })
  );
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(passport.initialize());
  routes(app);
  return app;
}
