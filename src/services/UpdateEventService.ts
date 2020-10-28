import { getCustomRepository } from 'typeorm';

import Event from '../models/Event';
import EventsRepository from '../repositories/EventsRepository';
import AppError from '../errors/AppError';

interface RequestDTO {
  postId: string;
  description: string;
  userId: string;
  toDate: Date;
  fromDate: Date;
}

class UpdateEventService {
  public async execute({
    postId,
    description,
    fromDate,
    toDate,
    userId,
  }: RequestDTO): Promise<Event> {
    const eventsRepository = getCustomRepository(EventsRepository);
    const findEventOtherInSameDate = await eventsRepository.findByDateUpdate(
      toDate,
      fromDate,
      userId,
      postId,
    );

    if (findEventOtherInSameDate) {
      throw new AppError('This event is already booked');
    }

    const event = await eventsRepository.findOne({
      where: { id: postId, userId },
    });
    if (!event) {
      throw new AppError('This Event does not exist');
    }

    event.fromDate = fromDate;
    event.toDate = toDate;
    event.description = description;

    await eventsRepository.save(event);

    return event;
  }
}

export default UpdateEventService;
