import { connectDB } from "../database/connect-mongodb";
import { getUserByName } from "./login";

/**
 * Adds a new course to the 'courses' collection in MongoDb.
 * For expected course object format, refer to initialState.js
 */
export const addNewCourse = async (course, username, password) => {
    if (getUserByName(username, password) != null){
        let db = await connectDB();
        let collection = db.collection(`courses`);
        let ack = await collection.insertOne(course);
        return ack.ops[0];
    }
    
}
