require("dotenv").config
import { Request,Response,NextFunction } from "express";
import jwt from 'jsonwebtoken'
import { JwtPayload } from "../types/jwt";

if( !process.env.JWT_SECRET ){
    throw new Error( "JWT_SECRET is not defined in environmental variable");
}
const JWT_SECRET = process.env.JWT_SECRET;

export const authMiddleware = (req:Request,res:Response,next:NextFunction)=>{
    const authHeader = req.headers.authorization;

    if( !authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({
            message : "auth token is missing "
        })
        return;
    }

    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token,JWT_SECRET) as JwtPayload
        if ( decoded.userId ){
            req.userId = decoded.userId
            next();
        }
        else{
            res.status(400).json({
                message:"token is missing"
            })
        }
    }
    catch(e){
        res.status(403).json({
            //@ts-ignore
            message: e.message
        })
    }
}