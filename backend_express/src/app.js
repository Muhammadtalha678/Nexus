import express from "express";
import AuthRouter from './routers/auth.router.js'
import UserRouter from './routers/user.router.js'
import BusinessRouter from './routers/business.router.js'
import ProfileRouter from './routers/profiles.router.js'
import RequestRouter from './routers/request.router.js'
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
app.use('/api/user',UserRouter)
app.use('/api/business', BusinessRouter)
app.use('/api/profile',ProfileRouter)
app.use('/api',RequestRouter)
export default app