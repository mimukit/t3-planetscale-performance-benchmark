/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { mysqlTable } from "drizzle-orm/mysql-core/table";
import { date, text } from "drizzle-orm/mysql-core/columns";

export const config = {
  runtime: "edge",
};

const dbConfig = {
  host: "aws.connect.psdb.cloud",
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

export const exampleTable = mysqlTable("example", {
  id: text("id").primaryKey(),
  name: text("name"),
  createdAt: date("createdAt").notNull(),
  updatedAt: date("updatedAt"),
});

export default async function handler() {
  const connection = connect(dbConfig);
  const db = drizzle(connection);

  const results = await db.select().from(exampleTable).limit(100);

  return new Response(
    JSON.stringify({
      message: "Hello from Edge runtime!",
      data: results?.length > 0 ? results : [],
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    }
  );
}
