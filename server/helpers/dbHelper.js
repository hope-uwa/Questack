import { Pool } from 'pg';

const connection = process.env.DATABASE_URL || 'postgres://xphjffwkceqqsr:8b60de777bf6a9a4ee92c989d614ce66dbe7b1ac656854f4d3fee157a69b33a9@ec2-54-83-51-78.compute-1.amazonaws.com:5432/ddfvvcckekgvda?ssl=true';

const pool = (process.env.NODE_ENV === 'test') ? new Pool({ connectionString: process.env.TEST_DATABASE_URL }) : new Pool({ connectionString: connection });


export default pool;
