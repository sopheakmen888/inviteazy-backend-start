import { Pool } from "pg";

export const connectPostgresDb = (): Pool => {
  const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "mydb",
    password: "12345678",
    port: 5444,
  });
  return pool;
};
