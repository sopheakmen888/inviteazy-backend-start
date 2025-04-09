// import { Pool, QueryResult } from "pg";
// import bcrypt from "bcrypt";
// import { IEvent, IEventRepository } from "../../interfaces/eventInterface";
// import { queryWithLogging } from "./utils";

// export class PostgresEventRepository implements IEventRepository {
//     private pool: Pool;
//     constructor(pool: Pool) {
//         this.pool = pool;
//     }
//     async findAll(): Promise<IEvent[]> {
//         const { rows } = await queryWithLogging(
//             this.pool,
//             "SELECT id,user_id, event_name,event_datetime ,event_location,event_description"
//         );
//         return rows;
//     }
//     async create(event: IEvent): Promise<IEvent> {
//         const { rows } = await queryWithLogging(
//             this.pool,
//             `INSERT INTO events (user_id, event_name, event_datetime, event_location, event_description
//             ) VALUES ($1, $2, $3, $4, $5) RETURNING
//              *`,
//             [event.user_id, event.event_name, event.event_datetime, event.event_location, event.event_description]
//         );
//         return rows[0];
//     }
//     async delete(id: number): Promise<void> {
//         await queryWithLogging(this.pool, "DELETE FROM events WHERE id = $1", [id
//         ]);
//     }
//     async update(id: number, event: IEvent): Promise<IEvent> {
//         const { rows } = await queryWithLogging(
//             this.pool,
//             `UPDATE events SET user_id = $1, event_name = $2, event_datetime =
//                     $3, event_location = $4, event_description = $5 WHERE id = $6
//                     RETURNING *`,
//             [event.user_id, event.event_name, event.event_datetime, event.event_location, event.event_description, id]
//         );
//         return rows[0];
//     }
//     async findById(id: number): Promise<IEvent | null> {
//         const { rows } = await queryWithLogging(
//             this.pool,
//             "SELECT id,user_id, event_name,event_datetime ,event_location,event_description FROM events WHERE id = $1",[id]
//         );
//         return rows[0] || null;
//     }


// }


import { Pool, QueryResult } from "pg";
import { IEvent, IEventRepository } from "../../interfaces/eventInterface";
import { queryWithLogging } from "./utils";

export class PostgresEventRepository implements IEventRepository {
  private pool: Pool;
  
  constructor(pool: Pool) {
    this.pool = pool;
  }

  async findAll(): Promise<IEvent[]> {
    try {
      const { rows } = await queryWithLogging(
        this.pool,
        "SELECT * FROM events"
      );
      return rows;
    } catch (error) {
      throw new Error("Failed to retrieve all events");
    }
  }

  async create(event: IEvent): Promise<IEvent> {
    try {
      const { rows } = await queryWithLogging(
        this.pool,
        `INSERT INTO events (user_id, event_name, event_datetime, event_location, event_description)
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [event.user_id, event.event_name, event.event_datetime, event.event_location, event.event_description]
      );
      return rows[0];
    } catch (error) {
      throw new Error("Failed to create event");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await queryWithLogging(this.pool, "DELETE FROM events WHERE id = $1", [id]);
    } catch (error) {
      throw new Error(`Failed to delete event with ID ${id}`);
    }
  }

  async update(id: string, event: IEvent): Promise<IEvent> {
    try {
      const { rows } = await queryWithLogging(
        this.pool,
        `UPDATE events SET user_id = $1, event_name = $2, event_datetime = $3, 
         event_location = $4, event_description = $5 WHERE id = $6 RETURNING *`,
        [
          event.user_id,
          event.event_name,
          event.event_datetime,
          event.event_location,
          event.event_description,
          id,
        ]
      );
      return rows[0];
    } catch (error) {
      throw new Error(`Failed to update event with ID ${id}`);
    }
  }

  async findById(id: string): Promise<IEvent | null> {
    try {
      const { rows } = await queryWithLogging(
        this.pool,
        "SELECT id, user_id, event_name, event_datetime, event_location, event_description FROM events WHERE id = $1",
        [id]
      );
      return rows[0] || null;
    } catch (error) {
      throw new Error(`Failed to find event with ID ${id}`);
    }
  }
}
