/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export default async function handler() {
  const result = await redis.get("testkey");

  return new Response(
    JSON.stringify({
      message: "Hello from Edge runtime!",
      data: result,
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    }
  );
}

export const config = {
  runtime: "edge",
};
