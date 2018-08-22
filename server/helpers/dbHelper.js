import { Pool } from 'pg';

const connection = process.env.DATABASE_URL || 'localhost://postgres:uwahope007@localhost:5432/stackoverflow';

const pool = (process.env.NODE_ENV === 'test') ? new Pool({ connectionString: process.env.TEST_DATABASE_URL }) : new Pool({ connectionString: connection });


export default pool;
