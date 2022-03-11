import { MongoClient } from 'mongodb';
import { MONGODB_CONNECTION_URL } from '../secrets/secrets';

let db = null;

/**
 * Connects to MongoDb.
 */
export async function connectDB(){
    if(db){
        return db;
    }
    let client = await MongoClient.connect(MONGODB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true } );
    db = client.db();
    console.log("Connected to MongoDb.");
    return db;
}
