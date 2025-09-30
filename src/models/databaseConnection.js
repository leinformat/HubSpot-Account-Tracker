import { config } from '../config/config.js';
import { MongoClient } from "mongodb";

const { DB_URI, DB_NAME } = config;
let dbInstance = null;

export async function connectDB() {
  if (!dbInstance) {
    const client = await MongoClient.connect(DB_URI);
    dbInstance = client.db(DB_NAME);
  }
  return dbInstance;
}