import { EntityRepository, Repository } from 'typeorm';

import Event from '../models/Event';

@EntityRepository(Event)
class EventsRepository extends Repository<Event> {
  public async findByDate(
    fromDate: Date,
    toDate: Date,
    userId: string,
  ): Promise<Event[]> {
    const findEvent = await this.query(
      `SELECT id
      FROM public.events
      WHERE ("fromDate" BETWEEN $1::DATE AND $2
      OR    "toDate"   BETWEEN $1::DATE AND $2)
      AND "userId" = $3;
      `,
      [fromDate, toDate, userId],
    );
    return findEvent;
  }

  /* SELECT id, "name", description, "fromDate", "toDate", "userId"
FROM public.events
WHERE ("fromDate" BETWEEN '2020-11-12 13:00:49'::DATE AND '2020-11-12 15:17:00'
or "toDate"   BETWEEN '2020-11-12 13:00:49'::DATE AND '2020-11-12 15:17:00')
AND "userId" = '93589172-dba8-4f8a-b615-7ea7140584a0'
AND "id" != 'a5326054-4f82-4edc-af0b-c2927dcb82cf';

  entityManager.query('SELECT u.name FROM users AS u WHERE u.name = $1 AND u.lastName = $2', ['John', 'Doe']);
    */
  /// //
  public async findByDateUpdate(
    fromDate: Date,
    toDate: Date,
    userId: string,
    postId: string,
  ): Promise<Event[]> {
    const findEvent = await this.query(
      `SELECT id
      FROM public.events
      WHERE ("fromDate" BETWEEN $1::DATE AND $2
      OR    "toDate"   BETWEEN $1::DATE AND $2)
      AND "userId" = $3
      AND id != $4;
      `,
      [fromDate, toDate, userId, postId],
    );
    return findEvent;
  }
}

export default EventsRepository;
