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

export const getDocuments = async (colection,filter) => {
  try {
    const db = await connectDB();
    const collection = db.collection(colection);
    //const filter = { date: '2025-02-04' };
    const filteredData = await collection.find(filter).toArray();
    return filteredData;

  } catch (error) {
    console.error(error);
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