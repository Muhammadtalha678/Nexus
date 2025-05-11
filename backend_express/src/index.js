import express from "express";
import { connectDb } from "./lib/db/connectDb.js";
import { env_config } from "./lib/configs/env.config.js";
import AuthRouter from './routers/auth.router.js'
const app = express()

app.use(express.json())

app.get('/', (req,res) => {
    return res.send("Hello World")
})

connectDb()
    .then(() => {
        app.use('/api/auth',AuthRouter)

        app.listen(env_config.port, () => {
            console.log("app running on port "+env_config.port);
            
        })
    }).
    catch((e) => {
        console.log(e);
    })

