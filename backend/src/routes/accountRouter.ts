import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware';
import { Account, User } from '../db';
import mongoose from 'mongoose';

export const accountRouter = express.Router();

accountRouter.get("/balance",authMiddleware, async(req,res)=>{
    const userId = req.userId;
    try{
        const data = await Account.findOne({ userId: userId})
        res.status(200).json({
            balance   : data?.balance
        })
    }
    catch(e){
        res.status(502).json({
            message : "Internal server Error "
        })
    }
})

accountRouter.post("/transfer",authMiddleware,async(req,res)=>{

    const session = await mongoose.startSession();
    session.startTransaction();               // -----session start-------

    const {amount,to} = req.body; // to == email 
    const userId    = req.userId

    try{ 
        // fetch account within the sessaion so that multiple req can denied
        const accountData = await Account.findOne({ userId:userId}).session(session)
        const balance  = accountData?.balance;

        if(!balance){
            await session.abortTransaction();
            res.json({
                message : "unable to fetch balance"
            })
            return
        }

        if( balance<=amount ){
            await session.abortTransaction();
            res.status(403).json({
                message : "Insufficieant balance"
            })
        }

        const reciever = await User.findOne({email:to}).session(session)
        if( !reciever ){
            await session.abortTransaction();
            res.status(403).json({
                message  : "reciever doesn't exist "
            })
            return;
        }

        await Account.updateOne({
            userId:reciever.id
        },{
            $inc:{
                balance : +amount
            }
        }).session(session)
        await Account.updateOne({
            userId:userId
        },{
            $inc:{
                balance : -amount
            }
        }).session(session)
        
        await session.commitTransaction()

        res.status(200).json({
            message : `${amount} transfer successful`
        })

    }
    catch(e){
        res.status(503).json({
            message : "transection not happen !!"
        })
    }

})