import { initialState } from "./initialState";
import { connectDB } from "./connect-mongodb";

export async function initializeDB(){
    let db = await connectDB();
    
    // if database empty, initialize with initialState data
    let user = await db.collection(`users`).findOne({username: "jeffbezos"});
    if(!user){
        console.log("Initializing database with initialState data");
        for (let collectionName in initialState){
            let collection = db.collection(collectionName);
            await collection.insertMany(initialState[collectionName]);
        }
    }
}
