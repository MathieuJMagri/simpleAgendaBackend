import { connectDB } from "../database/connect-mongodb";
import { ObjectId } from 'mongodb';

export const getUserByName = async (username, password) => {
    let db = await connectDB();
    let collection = db.collection(`users`);

    let user = await collection.findOne( {username : username} );
    try{
        if (user != null) {
            if (password == user.password) {
                await collection.updateOne({username: username}, {$set: {lastLogin: Date.now()}});
            }
        }
    } catch(err){
        user = null;
    }
    return user;
}