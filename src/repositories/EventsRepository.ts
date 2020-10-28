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
      WHERE "fromDate" BETWEEN $1::DATE AND $2
      OR    "toDate"   BETWEEN $1::DATE AND $2
      AND "userId" = $3;
      `,
      [fromDate, toDate, userId],
    );
    return findEvent;
  }

  /* SELECT id
FROM public.events
WHERE "fromDate" BETWEEN '2019-11-12T19:31:49.825Z'::DATE AND '2021-11-12T20:29:49.825Z'
OR    "toDate"   BETWEEN '2019-11-12T19:31:49.825Z'::DATE AND '2021-11-12T20:29:49.825Z'
AND "userId" = '620bd3db-7ac2-4eb7-994e-900db8898ce5';

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
      WHERE "fromDate" BETWEEN $1::DATE AND $2
      OR    "toDate"   BETWEEN $1::DATE AND $2
      AND "userId" = $3
      AND id != $4;
      `,
      [fromDate, toDate, userId, postId],
    );
    return findEvent;
  }
}

export default EventsRepository;
