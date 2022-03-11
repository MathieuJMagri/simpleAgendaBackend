import { connectDB } from "../database/connect-mongodb";
import { getUserByName } from "./login";

/**
 * Adds a new task to the 'tasks' collection in MongoDb.
 * For expected task object format, refer to initialState.js
 */
export const addNewTask = async (task, username, password) =>{
    if(getUserByName(username, password) != null){
        let db = await connectDB();
        let collection = db.collection(`tasks`);
        let ack = await collection.insertOne(task);
        return ack.ops[0];
    }
    
}
