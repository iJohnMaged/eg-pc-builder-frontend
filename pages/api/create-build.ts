import type { NextApiRequest, NextApiResponse } from 'next';
import { SelectedComponents } from '../../data/types';

interface RequestData {
    components: SelectedComponents;
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Get request body
    const { components }: RequestData = req.body;
    // Get ids of selected components
    const ids = Object.keys(components).map(key => { return { id: components[key].id } });
    const request = await fetch(`${process.env.API_ENDPOINT}/create-build/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            components: ids
        })
    });
    const json = await request.json();

    res.setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate");
    res.status(200).json({
        build: json
    });

}