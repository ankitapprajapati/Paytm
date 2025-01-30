import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware';
import { Account } from '../db';

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
    const {amount,to} = req.body;
    const userId    = req.userId

    try{ 
        const accountData = await Account.findOne({ userId:userId})
        const balance  = accountData?.balance;

        if(!balance){
            res.json({
                message : "unable to fetch balance"
            })
            return
        }

        if( balance<=amount ){
            res.status(403).json({
                message : "Insufficieant balance"
            })
        }
        
        res.status(200).json({
            message : `${amount} transfered`
        })

    }
    catch(e){
        res.status(503).json({
            message : "transection not happen !!"
        })
    }

})