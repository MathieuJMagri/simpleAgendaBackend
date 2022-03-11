import { query } from "express";
import { connectDB } from "../database/connect-mongodb";
import { ObjectId } from 'mongodb';

export const setCourseForTask = async (taskId, courseId) => {
    let db = await connectDB();
    let taskCollection = db.collection(`tasks`);
    let courseCollection = db.collection(`courses`);

    if(await taskCollection.findOne({_id: ObjectId(taskId)}) != null){
        if(await courseCollection.findOne({_id: ObjectId(courseId)}) != null){
            let ack = await taskCollection.updateOne({_id: ObjectId(taskId)}, {$set: {course: courseId}});
            return ack.result;
        }
        else{
            throw new Error("The course with the provided id does not exist.");
        }
    }
    else{
        throw new Error("The task with the provided id does not exist.");
    }
     
}
