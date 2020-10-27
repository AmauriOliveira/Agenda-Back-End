import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import EventsRepository from '../repositories/EventsRepository';
import CreateEventService from '../services/CreateEventService';
// import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const eventsRouter = Router();
// eventsRouter.use(ensureAuthenticated);

eventsRouter.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(EventsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

eventsRouter.post('/', async (request, response) => {
  const { description, userId, to, from } = request.body;

  const createAppointmentService = new CreateEventService();

  const appointment = await createAppointmentService.execute({
    description,
    userId,
    to,
    from,
  });

  return response.json(appointment);
});

export default eventsRouter;
