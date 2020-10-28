import { getRepository, DeleteResult } from 'typeorm';
import AppError from '../errors/AppError';
import Event from '../models/Event';

interface RequestDTO {
  id: string;
  userId: string;
}

class DeleteEventService {
  public async execute({ id, userId }: RequestDTO): Promise<DeleteResult> {
    const eventsRepository = getRepository(Event);

    const checkEventExist = await eventsRepository.findOne({
      select: ['id'],
      where: { id, userId },
    });

    if (!checkEventExist) {
      throw new AppError('This EventId does not exist');
    }

    const event = await eventsRepository.delete(id);

    return event;
  }
}
export default DeleteEventService;
