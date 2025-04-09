import { Pool } from "pg";
require("dotenv").config();

export const connectPostgresDb = (): Pool => {
  const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5435"),
  });
  return pool;
};
