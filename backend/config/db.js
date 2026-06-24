import mongoose from "mongoose";

const connectDb = async() => {
    
    try{
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASS}@vingocluster.fcvm6in.mongodb.net/vingo`);

        console.log("Database connected");
    }
    catch(err){
        console.log("Error in Database, please check your database connection", err)
    }

}

export default connectDb;