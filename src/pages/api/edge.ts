import { connect } from "@planetscale/database";

export const config = {
  runtime: "edge",
};

const dbConfig = {
  host: "aws.connect.psdb.cloud",
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

export default async function handler() {
  const conn = connect(dbConfig);

  const results = await conn.execute(
    "SELECT `mitest`.`example`.`id`, `mitest`.`example`.`name`, `mitest`.`example`.`createdAt`, `mitest`.`example`.`updatedAt` FROM `mitest`.`example` WHERE 1=1 ORDER BY `mitest`.`example`.`id` ASC LIMIT ? OFFSET ?",
    [100, 0]
  );

  return new Response(
    JSON.stringify({
      message: "Hello from Edge runtime!",
      data: results?.rows ? results.rows : [],
    }),
    {
      status: 200,
      headers: {
        "content-type": "application/json",
      },
    }
  );
}
