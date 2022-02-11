import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Get request body
    const uuid = req.query.uuid;
    // Get ids of selected components
    const request = await fetch(`${process.env.API_ENDPOINT}/builds/${uuid}`);
    const json = await request.json();

    res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
    res.status(200).json({
        build: json
    });

}