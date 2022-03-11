import { connectDB } from "../database/connect-mongodb";

/**
 * Deletes a task with the provided courseID from the database.
 */
export const deleteAllCourses = async () => {
    let db = await connectDB();
    let collection = db.collection(`courses`);
    let ack =  await collection.remove();
    return ack.result;
} 