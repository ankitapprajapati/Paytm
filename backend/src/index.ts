require ("dotenv").config()

import express,{Request,Response} from 'express'
import {mainRouter} from './routes/mainRouter'
import cors from 'cors'

const app = express();
const port = process.env.PORT

app.use( cors() )
app.use ( express.json() )

app.use ( "/api/v1",mainRouter);

app.listen(port,()=>{
    console.log(`app is listening at port : ${port}`)
})