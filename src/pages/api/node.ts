import type { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@planetscale/database";

const dbConfig = {
  host: "aws.connect.psdb.cloud",
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const conn = connect(dbConfig);

  const results = await conn.execute(
    "SELECT `mitest`.`example`.`id`, `mitest`.`example`.`name`, `mitest`.`example`.`createdAt`, `mitest`.`example`.`updatedAt` FROM `mitest`.`example` WHERE 1=1 ORDER BY `mitest`.`example`.`id` ASC LIMIT ? OFFSET ?",
    [100, 0]
  );

  res.status(200).json({
    message: "Hello from NodeJS runtime!",
    data: results?.rows ? results.rows : [],
  });
}
