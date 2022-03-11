import { connectDB } from "../database/connect-mongodb";
import { ObjectId } from 'mongodb';

/**
 * Deletes a task with the provided courseID from the database.
 */
export const deleteCourse = async (courseID) => {
    let db = await connectDB();
    let collection = db.collection(`courses`);
    let ack =  await collection.deleteOne({_id: ObjectId(courseID)});
    return ack.result;
} 
