import { Pool } from 'pg';

// Legacy pg pool — kept for raw SQL queries in analytics and search.
// AI vector search is handled via Prisma + pgvector extension through the Prisma client.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://localhost:5432/guidesoft',
});

export const query = (text: string, params?: any[]) => pool.query(text, params);

export const getClient = () => pool.connect();

export default pool;
