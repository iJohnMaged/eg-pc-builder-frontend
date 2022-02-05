import { NextApiRequest, NextApiResponse } from "next";
import { Pool } from "pg";

const pool = new Pool();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const cateogiresQuery = `SELECT * FROM "Category"`;
  const partsCategory = `SELECT * FROM "Part"`;
  const cateogiresResult = await pool.query(cateogiresQuery);
  const cateogiresMap = cateogiresResult.rows.reduce((acc, category) => {
    acc[category.id] = category.name;
    return acc;
  }, {});
  const partsResult = await pool.query(partsCategory);
  const parts = partsResult.rows.reduce((acc, part) => {
    const key = cateogiresMap[part.category];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(part);
    return acc;
  }, {});

  res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
  res.status(200).json({
    parts,
  });
}
