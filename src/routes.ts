import { Express } from 'express';
import userRouter from './components/users/user.router';
import sessionRouter from './components/sessions/session.router';
import carRouter from './components/cars/car.router';
import imageRouter from './components/images/image.router';
import brandRouter from './components/brand/brand.router';
import appointmentRouter from './components/appointments/appointment.router';

export default function routes(app: Express) {
  app.use(userRouter);
  app.use(sessionRouter);
  app.use(carRouter);
  app.use(imageRouter);
  app.use(brandRouter);
  app.use(appointmentRouter);
  return app;
}
