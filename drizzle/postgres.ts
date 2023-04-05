import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { Pool } from 'pg';

const pool = new Pool({
  host: process.env.PG_HOST || '0.0.0.0',
  port: parseInt(process.env.PG_PORT || '5432'),
  user: process.env.PG_USERNAME || 'postgres',
  password: process.env.PG_PASSWORD || 'postgres',
  database: process.env.PG_DATABASE || 'postgres',
});

export const db = drizzle(pool)

migrate(db, { migrationsFolder: './drizzle' }).then(reply => console.log(reply))

