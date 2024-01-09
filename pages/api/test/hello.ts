import { openDb } from "../db";

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   
   // Open database
   const db = await openDb()

   if (req.method === 'GET') {      
      // Get posts from database  
      const posts = await db.all('SELECT * FROM marvel')
      
      return res.status(200).json({ message: 'Hello from Next.js!', posts:posts })
   }
} 
