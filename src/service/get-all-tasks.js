import { connectDB } from "../database/connect-mongodb";

export const getAllTasks = async (username) => {
  let db = await connectDB();
  let collection = db.collection(`tasks`);

  return await collection.find({ ownerUser: username }).toArray();
};
