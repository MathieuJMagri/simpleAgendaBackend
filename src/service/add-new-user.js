import { connectDB } from "../database/connect-mongodb";

/**
 * Adds a new user to the 'users' collection in MongoDb.
 * For expected course object format, refer to initialState.js
 */
export const addNewUser = async (user) => {
    let db = await connectDB();
    let collection = db.collection(`users`);

    //If this username is already in use, return anomlously.
    let existing_user = await collection.findOne( {username : user.username} );
    if (existing_user != null) {
        return null;
    }
    
    //Insert user into db.
    let ack = await collection.insertOne(user);
    
    return ack.ops[0];
}