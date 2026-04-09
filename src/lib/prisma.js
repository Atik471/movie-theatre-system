const { PrismaClient } = require('../../src/generated/prisma');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString = process.env.DATABASE_URL || 
  (process.env.PGHOST ? `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}` : undefined);

if (!connectionString) {
  console.error("❌ CRITICAL ERROR: Database connection string is completely missing from the cloud environment!");
}

const pool = new Pool({ 
  connectionString,
  // Add SSL for cloud deployments where necessary
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined 
});
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

module.exports = prisma;
