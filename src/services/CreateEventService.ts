import { getCustomRepository } from 'typeorm';

import Event from '../models/Event';
import EventsRepository from '../repositories/EventsRepository';
import AppError from '../errors/AppError';

interface RequestDTO {
  description: string;
  userId: number;
  to: number;
  from: number;
}

class CreateEventService {
  public async execute({
    description,
    userId,
    to,
    from,
  }: RequestDTO): Promise<Event> {
    const eventsRepository = getCustomRepository(EventsRepository);

    const findAppointmentInSameDate = await eventsRepository.findByDate(
      to,
      from,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This event is already booked');
    }

    const event = eventsRepository.create({
      description,
      userId,
      to,
      from,
    });
    await eventsRepository.save(event);

    return event;
  }
}

export default CreateEventService;
