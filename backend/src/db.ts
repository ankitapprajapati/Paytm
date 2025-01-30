import mongoose from "mongoose"

require ("dotenv").config()

const mongo_url = process.env.MONGO_CONNECTION_URL

async function connectToDB(){
    if(mongo_url){
        await mongoose.connect(mongo_url)
            .then( ()=>{
                console.log( "connected to mongoDB successfully" );
            })
            .catch((e)=>{
                console.log("Error connecting to mongodb : "+e)
                process.exit(1)
            })
    }
    else{
        console.log("mongo connection url not found ")
    }
}
    
connectToDB();

const userSchema = new mongoose.Schema({
    firstName   : {   type:String, required:true, trim:true, maxLength:30  },
    lastName     : {   type:String, trim:true, maxLength:30 },
    email        : {   type:String, required:true, trim:true, unique:true },
    password     : {   type:String, required:true, trim:true, minLength:8 },
})
export const User = mongoose.model("users",userSchema)

const acountSchema = new mongoose.Schema({
    balance     : { type : Number, required:true },
    userId      : { type : mongoose.Schema.Types.ObjectId, ref:'User' , required:true }
})
export const Account = mongoose.model('accounts',acountSchema)

