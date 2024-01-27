import { openDb } from "../db";

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   
   // Open database
   const db = await openDb()

   if (req.method === 'GET') {      
      try {
         // Get posts from database
         const [posts] = await db.query('SELECT * FROM spare_marvel')
         
         return res.status(200).json({ posts: posts })
      } catch (error) {
         console.error('Error fetching posts:', error)
         return res.status(500).json({ error: 'Internal Server Error' })
      }
   }
} 
