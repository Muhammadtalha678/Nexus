import express from "express";
import { connectDb } from "./lib/db/connectDb.js";
import { env_config } from "./lib/configs/env.config.js";
import AuthRouter from './routers/auth.router.js'
import { Server } from 'socket.io'
import http from 'http'
import cors from 'cors'
const app = express()
app.use(cors({
    origin:['http://127.0.0.1:5500','http://localhost:5173']
}))
app.use(express.json())
app.get('/', (req,res) => {
    return res.send("Hello World")
})


app.use('/api/auth',AuthRouter)

export default app