import { EntityRepository, Repository, Between } from 'typeorm';

import Event from '../models/Event';

@EntityRepository(Event)
class EventsRepository extends Repository<Event> {
  public async findByDate(from: number, to: number): Promise<Event | null> {
    const findEvent = await this.findOne({
      from: Between(from, to),
      to: Between(from, to),
    });

    return findEvent || null;
  }
}

export default EventsRepository;
