import { ObjectId } from "mongodb";
import { connectDB } from "./databaseConnection.js";

export const createDocument = async (colection,data) =>{
  try {
    const db = await connectDB();

    const toInsertData = { ...data};

    const collection = db.collection(colection);
    return await collection.insertOne(toInsertData);
    
  } catch (error) {
    console.error(error);
  }
}

export const insertMultipleDocuments = async(colection,data) =>{
  try {
    const db = await connectDB();
    const collection = db.collection(colection);
    const toInsertData = data;

    const result = await collection.insertMany(toInsertData);

    return result;

  } catch (error) {
    return error;
  }
}

export const getDocuments = async (collectionName, filter = {}, sort = {}, limit = 0) => {
  try {
    const db = await connectDB();
    const collection = db.collection(collectionName);

    let cursor = collection.find(filter);

    if (sort.field) {
      cursor = cursor.sort({ [sort.field]: sort.order || 1 });
    }

    if (limit > 0) {
      cursor = cursor.limit(limit);
    }

    const docs = await cursor.toArray();
    return docs;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const upsertDocuments = async (colection, data) => {
  const db = await connectDB();
  const collection = db.collection(colection);

  const ops = data.map(doc => {
    doc._id = new ObjectId(doc._id);
    return {
      updateOne: {
        filter: { _id: doc._id },
        update: { $set: doc },
        upsert: true
      }
    };
  });

  return collection.bulkWrite(ops);
};