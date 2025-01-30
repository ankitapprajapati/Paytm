
import {Account, User} from '../db'
import bcrypt from 'bcrypt'

import express,{Request,Response} from 'express'
import jwt from 'jsonwebtoken'
import {z} from 'zod'
import { signupSchema } from '../zod_schema/signupSchema'
import { signinSchema } from '../zod_schema/signinSchema'
import { authMiddleware } from '../middleware/authMiddleware'
import { updateSchema } from '../zod_schema/updateSchema'
import { Iuser } from '../types/mongoose'

require("dotenv").config()
if( !process.env.JWT_SECRET ){
    throw new Error( "JWT_SECRET is not defined in environmental variable");
}
const secret:string|undefined = process.env.JWT_SECRET

export const userRouter = express.Router();

userRouter.post("/signup", async(req:Request,res:Response):Promise<void>=>{

    // validation
    const result = signupSchema.safeParse(req.body);
    if(!result.success ){
        res.status(400).json({
            message : result.error.issues[0].message,
            feild   : result.error.issues[0].path[0],
        })
        return;
    }

    let { firstName,lastName,password,email} = req.body;

    try{
        const isUserExist = await User.findOne({ email:email})
        if( isUserExist ){
            res.status(409).json({
                message:"email already taken"
            })
            return;
        }    
        
        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:hashedPassword
        })

        const userId = user._id;

        // ---------create account and give him random amount
        await Account.create({
            userId  : userId ,
            balance : Math.ceil( Math.random()*10000)
        })

        res.status(200).json({
            message:"acount created successfully "
        })
    }
    catch(e){
        console.log("Craete user error : "+e)
        res.status(500).json({
            //@ts-ignore
            message:e.message
        })
    }
})

userRouter.post("/signin", async(req:Request,res:Response):Promise<void>=>{

    // validataion
    const result = signinSchema.safeParse(req.body);
    if( !result.success ){
        res.status(400).json({
            message : result.error.issues[0].message,
            feild   : result.error.issues[0].path[0],            
        })
        return;
    }
    
    const {email,password}=req.body;

    try{
        const user = await User.findOne({email});
        if( !user ){
            res.status(404).json({
                message:"user not found"
            })
            return;
        }

        // check password
        const isCorrectPassword = await bcrypt.compare(password,user.password)

        if( !isCorrectPassword ){
            res.status(400).json({
                message:"Enter correct password"
            })
            return;
        }

        // secret is undefined
        if( !secret ){
            console.log(" jwt secret is missing");
            res.status(500).json({
                message:"internal server Error"
            })
            return;
        }
        const token = jwt.sign({userId:user._id},secret);

        res.status(200).json({
            token:token,
        })
    }
    catch(e){
        res.json({
            // @ts-ignore
            message:e.message
        })
    }
})

userRouter.put("/update",authMiddleware,async(req,res)=>{

    // validation
    const result = updateSchema.safeParse(req.body);
    if ( !result.success ){
        res.status(403).json({
            message : result.error.issues[0].message,
            feild   : result.error.issues[0].path[0],
        })
        return;
    }

    const {firstName,lastName,password} = req.body;

    const userId = req.userId;
    if( !userId ){
        res.status(500).json({
            message : "Please sign-in again"
        })
        return;
    }
    
    try{
        
        // Fetch user by userId
        const user: any = await User.findById(userId);

        if( !user ){
            res.status(404).json({
                message : "user not found",
            })
            return;
        }

        if( firstName ) user.firstName= firstName;
        if( lastName ) user.lastName = lastName;

        if( password ){
            const hashedPassword = await bcrypt.hash(password,10);
            user.password = hashedPassword;
        }

        await user.save()
        res.status(200).json({
            message   : "updated successfully "
        })
    }
    catch(e){
        res.status(504).json({
            // @ts-ignore
            message : "error while updating : "+e.message
        })
    }
})

userRouter.get("/bulk",async(req,res)=>{
    const filter = req.query.filter || ""
    try{
        const users = await User.find({
            $or : [
                {
                    firstName:{ 
                        "$regex" : filter,
                        "$options" : "i"
                    }
                },
                {
                    lastName  : {
                        "$regex"  : filter,
                        "$options" : "i"
                    }
                }
            ]
        })

        res.status(200).json({
            user    : users.map( (user)=>({
                firstName   : user.firstName,
                lastName    : user.lastName,
                email       : user.email
            }) )
        })
    }
    catch(e){
        res.status(501).json({
            message  : "internal server error"
        })
    }
})

