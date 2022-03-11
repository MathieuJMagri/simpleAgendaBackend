import { connectDB } from "../database/connect-mongodb";
import { ObjectId } from 'mongodb';

/**
 * Updates a task in the database.
 */
export const updateTask = async (task) => {
    let {_id, name, course, status, dueDateTime} = task;
    let db = await connectDB();
    let collection = db.collection(`tasks`);

    if(name){
        await collection.updateOne({_id: ObjectId(_id)}, {$set: {name}});
    }

    if(course){
        await collection.updateOne({_id: ObjectId(_id)}, {$set: {course}});
    }

    if(status){
        await collection.updateOne({_id: ObjectId(_id)}, {$set: {status}});
    }

    if(dueDateTime){
        await collection.updateOne({_id: ObjectId(_id)}, {$set: {dueDateTime}});
    }
    return task;
}
