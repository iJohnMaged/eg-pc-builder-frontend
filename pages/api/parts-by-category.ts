import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";

const pool = new Pool();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const partsCategory = `SELECT "Part".* FROM "Part" INNER JOIN "Category" ON "Category"."id" = "Part"."category" AND LOWER("Category"."name") = LOWER($1) AND "Part"."recently_scraped" = true`;
    const partsResult = await pool.query(partsCategory, [req.query.category]);

    res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
    res.status(200).json({
        parts: partsResult.rows,
    });
}
