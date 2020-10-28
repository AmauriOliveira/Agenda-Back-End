import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO, compareDesc } from 'date-fns';

import EventsRepository from '../repositories/EventsRepository';
import CreateEventService from '../services/CreateEventService';
import UpdateEventService from '../services/UpdateEventService';
import DeleteEventService from '../services/DeleteEventService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import AppError from '../errors/AppError';

const eventsRouter = Router();
eventsRouter.use(ensureAuthenticated);
/// ////////////////////
eventsRouter.get('/', async (request, response) => {
  const eventsRepository = getCustomRepository(EventsRepository);
  const events = await eventsRepository.find({ userId: request.user.id });

  return response.json(events);
});
/// ////////////////////
eventsRouter.get('/:id', async (request, response) => {
  const { id } = request.params;
  const eventsRepository = getCustomRepository(EventsRepository);
  const events = await eventsRepository.findOne({
    where: { id, userId: request.user.id },
  });

  if (!events) {
    throw new AppError('Event can not found', 404);
  }

  return response.json(events);
});
/// ////////////////////////////
eventsRouter.post('/', async (request, response) => {
  const { description, toDate, fromDate } = request.body;

  const parsedFromDate = parseISO(fromDate);
  const parsedToDate = parseISO(toDate);

  const time = compareDesc(parsedFromDate, parsedToDate);

  if (time !== 1) {
    throw new AppError('Has an error on one of the dates', 400);
  }

  const createEventService = new CreateEventService();

  const event = await createEventService.execute({
    description,
    userId: request.user.id,
    fromDate: parsedFromDate,
    toDate: parsedToDate,
  });

  return response.json(event);
});
/// //////////////////////////
eventsRouter.put('/:id', async (request, response) => {
  const { id } = request.params;
  const { description, toDate, fromDate } = request.body;

  const parsedFromDate = parseISO(fromDate);
  const parsedToDate = parseISO(toDate);

  const time = compareDesc(parsedFromDate, parsedToDate);

  if (time !== 1) {
    throw new AppError('Has an error on one of the dates', 400);
  }

  const updateEventService = new UpdateEventService();

  const event = await updateEventService.execute({
    postId: id,
    description,
    fromDate: parsedFromDate,
    toDate: parsedToDate,
    userId: request.user.id,
  });

  return response.json(event);
});
/// /////////////////////////////////////

eventsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;
  const deleteEventService = new DeleteEventService();
  const event = await deleteEventService.execute({
    id,
    userId: request.user.id,
  });

  return response.json(event);
});

export default eventsRouter;
