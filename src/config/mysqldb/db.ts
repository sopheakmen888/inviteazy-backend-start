import { createPool, Pool } from 'mysql2';
import mysql from 'mysql2';
export const connectMysqlDb = (): Pool => {
  const pool = createPool({
    host: "localhost",
    port: 3303,
    user: "mey",
    password: "11022023",
    database: "inviteazy",
  });

  return pool;
};

