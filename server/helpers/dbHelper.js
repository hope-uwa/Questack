import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();


const connection = 'postgres://postgres:uwahope007@localhost:5432/stackoverflowlite';

const pool = (process.env.NODE_ENV === 'test') ? new Pool({ connectionString: process.env.TEST_DATABASE_URL }) : new Pool({ connectionString: process.env.DATABASE_URL });

console.log(process.env.DATABASE_URL)
export default pool;
