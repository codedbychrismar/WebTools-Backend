// src/db/index.ts
import dotenv from "dotenv";
dotenv.config(); // load .env variables

import { drizzle } from "drizzle-orm/node-postgres";
import pkg from "pg";
import * as schema from "./schema/index"; // adjust path if needed

const { Pool } = pkg;

// Use DATABASE_URL directly
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required by DigitalOcean
  },
});

// Initialize Drizzle
export const db = drizzle(pool, { schema });

// Optional: export pool if you need raw queries elsewhere
export { pool };
