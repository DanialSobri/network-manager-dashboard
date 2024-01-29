import { NextApiRequest, NextApiResponse } from 'next';
import { openDb } from './db';
import passwordHash from 'password-hash';

interface User {
    id: number;
    username: string;
    password: string;
    role: 'admin' | 'user'; // Role can be either 'admin' or 'user'
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username, password, admincode } = req.body;

        // Perform validation (e.g., check for required fields)
        if (!username || !password) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        try {
            // Open database
            const db = await openDb();

            // Check if username already exists
            const userExistsQuery = `SELECT * FROM users WHERE username = ?`;
            const userExistsValues = [username];
            const [result] = await db.execute(userExistsQuery, userExistsValues) as any;
            const userExist = <User>result[0]; // Cast to user

            if (userExist) {
                console.log(userExist);
                // If username already exists, return an error response
                return res.status(400).json({ message: 'Username already exists' });
            }

            // Hash the password using password-hash
            const hashedPassword = passwordHash.generate(password);

            // Check if it's trying to create an admin
            let role: 'admin' | 'user' = 'user';
            if (admincode && admincode === '75u7xafGA7MR80KYx') {
                role = 'admin';
            }

            // Perform user registration
            const userQuery = `INSERT INTO users (username, password, role) VALUES (?, ?, ?)`;
            const userValues = [username, hashedPassword, role];

            await db.query(userQuery, userValues);
            db.end();

            return res.status(201).json({ message: 'Registration successful' });
        } catch (error) {
            console.error('An error occurred during registration:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    } else {
        return res.status(405).end(); // Method Not Allowed
    }
}
