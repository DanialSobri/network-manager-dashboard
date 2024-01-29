import { openDb } from "../db";
import type { NextApiRequest, NextApiResponse } from 'next';

// Example Body request:
// [
//     { "id": 1, "Status": "Available" },
//     { "id": 2, "Status": "Faulty" },
//     { "id": 3, "Status": "Faulty" }
// ]

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === 'POST') {
            const updates:any[] = req.body; // Array of objects containing id and status pairs

            // Validate request parameters
            if (!Array.isArray(updates) || updates.length === 0) {
                return res.status(400).json({ error: 'Invalid or missing parameters' });
            }

            // Open database
            const db = await openDb();

            // Begin transaction
            await db.beginTransaction();

            try {
                // Update spare statuses in the database
                for (const update of updates) {
                    const { id, Status } = update;

                    // Validate individual update parameters
                    if (!id || typeof id !== 'number' || !Status || typeof Status !== 'string') {
                        await db.rollback();
                        return res.status(400).json({ error: 'Invalid parameters in update request' });
                    }
                    
                    // Execute update query
                    await db.query('UPDATE spare_marvel SET status = ? WHERE id = ?', [Status, id]);
                }

                // Commit transaction if all updates are successful
                await db.commit();

                // Close database connection
                await db.end();

                return res.status(200).json({ message: 'Spare statuses updated successfully' });
            } catch (error) {
                // Rollback transaction if any error occurs during updates
                await db.rollback();
                throw error; // Throw error to be caught by outer catch block
            }
        } else {
            return res.status(405).json({ error: 'Method Not Allowed' });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}
