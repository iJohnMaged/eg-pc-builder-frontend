import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const category = req.query.category;
    if (!category) {
        res.status(400).json({
            error: 'category is required'
        });
        return;
    }
    const parts = await fetch(`${process.env.API_ENDPOINT}/components?category_name=${category}`);
    const json = await parts.json();
    res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
    res.status(200).json({
        parts: json
    });
}
