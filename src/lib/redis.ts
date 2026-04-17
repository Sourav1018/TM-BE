import { createClient } from "redis";
import { env } from "env";

type AppRedisClient = ReturnType<typeof createClient>;

const globalForRedis = globalThis as unknown as {
  redis?: AppRedisClient;
};

function createRedisSingleton(): AppRedisClient {
  const client = createClient({
    url: env.REDIS_URL,
  });

  client.on("error", (error: unknown) => {
    console.error("Redis client error:", error);
  });

  return client;
}

export const redis = globalForRedis.redis ?? createRedisSingleton();

if (env.NODE_ENV !== "production") {
  globalForRedis.redis = redis;
}
