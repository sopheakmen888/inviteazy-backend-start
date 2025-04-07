import { Pool } from "pg";

export const connectPostgresDb = (): Pool => {
  const pool = new Pool({
    user: "meymey",
    host: "localhost",
    database: "inviteazydb", 
    password: "11022023", 
    port: 5433, 
  });
  return pool;
};
