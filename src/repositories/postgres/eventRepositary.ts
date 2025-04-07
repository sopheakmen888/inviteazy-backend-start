import { Pool } from "pg";
import {
  IEvent,
  IEventRepository,
  IEventWithoutId,
} from "../../interfaces/eventInterface";
import { queryWithLogging } from "./utils";

export class PostgresEventRepository implements IEventRepository {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findAll(): Promise<IEvent[]> {
    const { rows } = await queryWithLogging(
      this.pool,
      "SELECT id, name, date, time, location, description FROM events"
    );
    return rows;
  }

  async create(event: IEventWithoutId): Promise<IEvent> {
    const { name, date, time, location, description } = event;
    const { rows } = await queryWithLogging(
      this.pool,
      "INSERT INTO events (name, date, time, location, description) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, date, time, location, description",
      [name, date, time, location, description]
    );
    return rows[0];
  }

    async findById(id: string): Promise<IEvent | null> {
      const { rows } = await queryWithLogging(
        this.pool,
        "SELECT id, name, date, time, location, description FROM events WHERE id = $1",
        [id]
      );
      return rows[0] || null;
    }

    async findByName(name: string): Promise<IEvent | null> {
      const { rows } = await queryWithLogging(
        this.pool,
        "SELECT id, name, date, time, location, description FROM events WHERE name = $1",
        [name]
      );
      return rows[0] || null;
    }
}
