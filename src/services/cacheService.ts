import { createClient, RedisClientType } from "redis";

class RedisCacheService {
  private client: RedisClientType;
  private static instance: RedisCacheService;

  private constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL || "redis://localhost:6379",
      socket: {
        reconnectStrategy: (retries) => Math.min(retries * 50, 1000),
      },
    });
    this.client.on("error", (err) => console.log("Redis Client Error", err));
    this.connect();
  }

  private async connect() {
    try {
      await this.client.connect();
      console.log("Connected to Redis");
    } catch (err) {
      console.log("Redis connection error:", err);
    }
  }

  public static getInstance(): RedisCacheService {
    if (!RedisCacheService.instance) {
      RedisCacheService.instance = new RedisCacheService();
    }
    return RedisCacheService.instance;
  }

  public async get(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (error) {
      console.error("Redis get error:", error);
      return null;
    }
  }

  public async set(
    key: string,
    value: string,
    expirationInSeconds?: number
  ): Promise<void> {
    try {
      if (expirationInSeconds) {
        await this.client.setEx(key, expirationInSeconds, value);
      } else {
        await this.client.set(key, value);
      }
    } catch (error) {
      console.error("Redis set error:", error);
    }
  }

  public async del(key: string): Promise<void> {
    try {
      await this.client.del(key);
    } catch (error) {
      console.error("Redis delete error:", error);
    }
  }

  public async clear(): Promise<void> {
    try {
      await this.client.flushAll();
    } catch (error) {
      console.error("Redis clear error:", error);
    }
  }
}

export default RedisCacheService.getInstance();
