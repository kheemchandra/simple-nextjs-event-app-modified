import { MongoClient } from 'mongodb';

export async function connectDB() {
  const url = 'mongodb+srv://kheem:kheem@cluster0.ldo1rpm.mongodb.net/events-test?retryWrites=true&w=majority';
  const client = await MongoClient.connect(url);
  return client;
}

export function getCollection(client, collectionName){
  const db = client.db();
  const collection = db.collection(collectionName);
  return collection;
}

export async function getDocuments(collection, sort, filter={}){
  const documents = await collection.find(filter).sort(sort).toArray();
  return documents;
}