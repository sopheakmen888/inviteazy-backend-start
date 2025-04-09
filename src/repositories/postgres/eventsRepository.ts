// import { Pool, QueryResult } from "pg";
// import bcrypt from "bcrypt";
// import { Event } from "../../interfaces/eventsInterface";
// import { queryWithLogging } from "./utils";

// export  class EventPostgresUserRepository implements Event {
//   private pool: Pool;

//   constructor(pool: Pool) {
//     this.pool = pool;
//   }


//   async create(event: Omit<Event, "id">): Promise<Event> {
//     const { rows } = await queryWithLogging(
//       this.pool,
//       "INSERT INTO events (name, ,date,time , location, description) VALUES ($1, $2, $3, $4) RETURNING id, name, date, location, description",
//       [event.name, event.dateTime, event.location, event.description]
//     );
//     return rows[0];
//   }
// }
