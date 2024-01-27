import { openDb } from "../db";

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

   // Open database
   const db = await openDb()

   if (req.method === 'GET') {
      // Get spares from database  
      const spares = await db.query('SELECT * FROM marvel')

      return res.status(200).json({ spares: spares })
   }
} 
