import { connectDB } from "../database/connect-mongodb";
import { ObjectId } from 'mongodb';

/**
 * Deletes a task with the provided taskID from the database.
 */
export const deleteTask = async (taskID) => {
    let db = await connectDB();
    let collection = db.collection(`tasks`);
    let ack =  await collection.deleteOne({_id: ObjectId(taskID)});
    return ack.result;
} 
