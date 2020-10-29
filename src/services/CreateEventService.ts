import { getCustomRepository } from 'typeorm';

import Event from '../models/Event';
import EventsRepository from '../repositories/EventsRepository';
import AppError from '../errors/AppError';

interface RequestDTO {
  name: string;
  description: string;
  userId: string;
  toDate: Date;
  fromDate: Date;
}

class CreateEventService {
  public async execute({
    name,
    description,
    userId,
    toDate,
    fromDate,
  }: RequestDTO): Promise<Event> {
    const eventsRepository = getCustomRepository(EventsRepository);
    const findEventInSameDate = await eventsRepository.findByDate(
      fromDate,
      toDate,
      userId,
    );

    if (findEventInSameDate.length !== 0) {
      throw new AppError('This event is already booked');
    }

    const event = eventsRepository.create({
      name,
      description,
      userId,
      fromDate,
      toDate,
    });
    await eventsRepository.save(event);

    return event;
  }
}

export default CreateEventService;
