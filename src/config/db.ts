import { Pool }
from 'pg';

const pool = new Pool(
    {
        user: 'roriputu',
        host: 'localhost',
        database: 'wiarmDb',
        password: 'fruition7',
        port: 5432,
    }
);

async function queryDatabase() {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Current time:', res.rows [0]);
    } catch (err) { console.error('Error executing query', err);
    } finally {
        await pool.
            end();
    }
} 

export default queryDatabase;
