// pages/api/some-route.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const userCookie = req.cookies.user;

  // Check if the user is authenticated
  if (userCookie === 'authenticated') {
    // Perform actions for authenticated users
    res.status(200).json({ message: 'Authenticated' });
  } else {
    res.status(401).json({ message: 'Unauthenticated' });
  }
}
