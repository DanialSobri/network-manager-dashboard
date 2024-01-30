import { openDb } from "../db";
import type { NextApiRequest, NextApiResponse } from 'next';
import { RowDataPacket } from "mysql2";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            let { name, gen, loc } = req.query;
            // If both not stated
            if(!name && !loc){
                return res.status(400).json({ error: 'Invalid or missing name parameter' });
            }
            // Check if name is provided and is a string
            if (!name || typeof name !== 'string') {
                name = '%';
            }

            if (!loc || typeof loc !== 'string') {
                loc = '%';
            }

            if (!gen || typeof gen !== 'string') {
                gen = "marvel";
            }

            // Open database
            const db = await openDb();

            // Get spares from database using parameterized query
            var spares: RowDataPacket[] = [];


            switch (gen) {
                case "ibse":
                    // statement 1
                    spares = []
                    break;
                case "marvel":
                    // statement 1
                    // console.log('SELECT * FROM spare_marvel WHERE Description LIKE `%'+name+'%` AND Router LIKE `%'+loc+'%`');
                    [spares] = await db.query('SELECT * FROM spare_marvel WHERE Description LIKE ? AND Router LIKE ?', [`%${name.toLowerCase()}%`, `%${loc.toLowerCase()}%`]) as any;
                    break;
                default:
                    // Default call from spare_marvel
                    break;
            }

            // Close database
            await db.end();

            return res.status(200).json({ spares });
        } else {
            return res.status(405).json({ error: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
