import { connectDB } from "../database/connect-mongodb";

export const getAllCourses = async (username) => {
    let db = await connectDB();
    let collection = db.collection(`courses`);

    return await collection.find({ ownerUser: username }).toArray();
}
