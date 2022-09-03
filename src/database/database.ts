import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();
const { NODE_ENV, POSTGRES_HOST, POSTGRES_DB, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_DB_TEST } = process.env;
const dbPool = new Pool({
  host: POSTGRES_HOST,
  database: NODE_ENV == 'dev' ? POSTGRES_DB : POSTGRES_DB_TEST,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  port: parseInt(POSTGRES_PORT as string)
});
if (NODE_ENV == 'dev') {
  dbPool.on('connect', () => {
    console.log(`Connected to ${POSTGRES_USER}@${POSTGRES_HOST}/${POSTGRES_DB}`);
  });
}

dbPool.on('error', (error: Error) => {
  console.error(error.message);
});
export default dbPool;
