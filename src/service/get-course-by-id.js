import { connectDB } from "../database/connect-mongodb";
import { ObjectId } from 'mongodb';

export const getCourseById = async (id) => {
    let db = await connectDB();
    let collection = db.collection(`courses`);

    let course = {};

    try{
        course = await collection.find({_id: ObjectId(id)}).next();
    } catch(err){
        throw new Error(err.message);
    }
    return course;
}
