import { connectDB } from "../database/connect-mongodb";
import { ObjectId } from 'mongodb';

export const getTaskById = async (id) => {
    let db = await connectDB();
    let collection = db.collection(`tasks`);

    let task = {};

    try{
        task = await collection.find({_id: ObjectId(id)}).next();
    } catch(err){
        throw new Error(err.message);
    }
    return task;
}
