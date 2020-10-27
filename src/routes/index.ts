import { Router } from 'express';
import eventsRouter from './eventsRoutes';
import usersRouter from './usersRoutes';
import sessionsRouter from './sessionsRoutes';

const routes = Router();

routes.use('/events', eventsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
