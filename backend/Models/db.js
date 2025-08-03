const { MongoClient } = require('mongodb');

// dotenv is only needed for local development. In Cloud Run, env vars are injected.
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

let client = null;
let db = null;
const dbName = 'banking';

async function connect() {
  // If already connected, do nothing.
  if (db) {
    return;
  }

  const connection_str = process.env.MONGODB_CONNECTIONSTR;
  if (!connection_str) {
    throw new Error('MONGODB_CONNECTIONSTR environment variable is not set.');
  }

  try {
    // Create the client and connect only when needed.
    client = new MongoClient(connection_str);
    await client.connect();
    db = client.db(dbName);
    console.log('Successfully connected to MongoDB.');
  } catch (error) {
    console.error('Database connection failed:', error);
    // Re-throw the error to be caught by the caller in index.js
    throw error;
  }
}

function getDb() {
  if (!db) {
    throw new Error('Database not connected. Call connect() first.');
  }
  return db;
}

async function cleanup() {
  if (client) {
    await client.close();
  }
}

module.exports = { connect, getDb, cleanup };