import mysql from 'mysql2/promise';

// Open MySQL database connection
export async function openDb() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'echoroot',
        password: '4Hz8s4Vqk077RgWu',
        database: 'echo'
    });

    return connection;
}