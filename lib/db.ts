import { MongoClient } from 'mongodb';


export const connectToDatabase = async () => {
  // Enable command monitoring for debugging
  const client = new MongoClient(
    'mongodb+srv://agent-007:delase@cluster0.ejg5rih.mongodb.net/',
    { monitorCommands: true });

  return client;
}



