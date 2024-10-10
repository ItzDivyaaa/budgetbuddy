import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
const sql = neon('postgresql://neondb_owner:ycJji3k2tBRT@ep-raspy-mud-a5ufx3bs.us-east-2.aws.neon.tech/neondb?sslmode=require');
export const db = drizzle(sql,{schema});
