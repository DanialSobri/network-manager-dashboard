import { openDb } from "../db";
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'GET') {
            const { name,gen } = req.query;
            // Check if name is provided and is a string
            if (!name || typeof name !== 'string') {
                return res.status(400).json({ error: 'Invalid or missing name parameter' });
            }

            // Open database
            const db = await openDb();

            // Get spares from database using parameterized query
            var spares = [];
            
            
            switch ( gen ) {
                case "ibse":
                    // statement 1
                    spares = []
                    break;
                default: 
                    // Default call from marvel
                    spares = await db.all('SELECT * FROM marvel WHERE Description LIKE ?', [`%${name}%`]);
                    break;
             }

            // Close database
            await db.close();

            return res.status(200).json({ spares });
        } else {
            return res.status(405).json({ error: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
