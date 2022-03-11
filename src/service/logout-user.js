import { connectDB } from "../database/connect-mongodb";
import { query } from "express";
import { ObjectId } from 'mongodb';

/*
 PUT request for logging out and clearing lastLogin.
 there will be a long field in the user collection for each user 
 that indicates whether or not a user has recently logged in. 
 This is lastLogin. When a user logs out, this field is set to 0 in the database 
 and the frontend is informed in a response that logout is succesful. 
*/


export const logoutUser = async (userId) => {
    let db = await connectDB();
    let collection = db.collection(`users`);
    
    try{
        if (await collection.findOne({_id: ObjectId(userId)}) != null) {
            let ack = await collection.updateOne({_id: ObjectId(userId)}, {$set: {lastLogin: 0}});
            return ack.result;
        }
    }
    catch(e) {
        throw new Error("User ID " + userId + " does not exist");
    }
}
