import { Pool, QueryResult } from "pg";
import { logger } from "../../services/loggerService";

export async function queryWithLogging<T>(
  pool: Pool,
  sql: string,
  params: any[] = [],
  requestId?: string
): Promise<QueryResult<any>> {
  const startTime = Date.now();
  try {
    const result = await pool.query(sql, params);
    const duration = Date.now() - startTime;
    logger.info("Database query executed", {
      requestId,
      sql,
      params,
      rowCount: result.rowCount,
      duration: `${duration}ms`,
    });

    return result;
  } catch (error) {
    if (error instanceof Error) {
      const duration = Date.now() - startTime;
      logger.error("Database query failed", {
        requestId,
        sql,
        params,
        error: error.message,
        duration: `${duration}ms`,
      });
    }
    throw error;
  }
}


