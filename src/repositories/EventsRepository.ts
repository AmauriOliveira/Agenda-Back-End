import {
  EntityRepository,
  Repository,
  MoreThanOrEqual,
  LessThanOrEqual,
  Not,
} from 'typeorm';

import Event from '../models/Event';

@EntityRepository(Event)
class EventsRepository extends Repository<Event> {
  public async findByDate(
    fromDate: Date,
    toDate: Date,
    userId: string,
  ): Promise<Event | null> {
    const findEvent = await this.findOne({
      where: {
        fromDate: MoreThanOrEqual(fromDate),
        toDate: LessThanOrEqual(toDate),
        userId,
      },
    });

    return findEvent || null;
  }

  /// //
  public async findByDateUpdate(
    fromDate: Date,
    toDate: Date,
    userId: string,
    postId: string,
  ): Promise<Event | null> {
    const findEvent = await this.findOne({
      where: {
        fromDate: MoreThanOrEqual(fromDate),
        toDate: LessThanOrEqual(toDate),
        userId,
        id: Not(postId),
      },
    });
    return findEvent || null;
  }
}

export default EventsRepository;
