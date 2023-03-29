import type { NextRequest } from "next/server";

export const config = {
  runtime: "edge",
};

export default function handler() {
  return new Response(
    JSON.stringify({
      message: "Hello from Edge runtime!",
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    }
  );
}
