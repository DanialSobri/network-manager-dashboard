import { NextApiRequest, NextApiResponse } from 'next';
import { openDb } from './db';
import passwordHash from 'password-hash';
import jwt from 'jsonwebtoken'; // You need to install the jsonwebtoken package

interface User {
    id: number;
    username: string;
    password: string;
    role: 'admin' | 'user'; // Role can be either 'admin' or 'user'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        // Perform validation (e.g., check for required fields)
        if (!username || !password) {
            return res.status(400).json({ message: 'Please provide both username and password' });
        }

        try {
            // Open database
            const db = await openDb();

            // Check if username exists
            const userQuery = `SELECT * FROM users WHERE username = ?`;
            const userValues = [username];
            const [result] = await db.execute(userQuery, userValues) as any;
            const user: User = result[0];

            if (!user) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            // Compare the provided password with the hashed password from the database
            const isPasswordValid = passwordHash.verify(password, user.password);

            if (!isPasswordValid) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            // Generate a JWT token
            const token = jwt.sign({ userId: user.id, username: user.username, role: user.role }, "your_secret_key");

            db.end();

            return res.status(200).json({ token });
        } catch (error) {
            console.error('An error occurred during login:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        return res.status(405).end(); // Method Not Allowed
    }
}
