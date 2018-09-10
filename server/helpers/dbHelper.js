import { Pool } from 'pg';

const connection = process.env.DATABASE_URL || process.env.TEST_DB_URL;

const pool = (process.env.NODE_ENV === 'test') ? new Pool({ connectionString: process.env.TEST_DATABASE_URL }) : new Pool({ connectionString: connection });


export default pool;
