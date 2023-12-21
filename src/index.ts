import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import mongoose from 'mongoose'

import router from './router'


const app = express()

app.use(cors({
    credentials: true,
    
}))

app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(3001, () => {
    console.log('Server is running on port 3001')
})

let mongoUsername = process.env.MONGO_USERNAME //replace with your username
let mongoPASS= process.env.MONGO_PASSWORD //replace with your password

const MONGO_URL = `mongodb+srv://${mongoUsername}:${mongoPASS}@cluster0.ceo5pir.mongodb.net/?retryWrites=true&w=majority`
console.log(MONGO_URL)
mongoose.Promise = Promise
mongoose.connect(MONGO_URL)
mongoose.connection.on("connected", () => console.log("Connected to Mongo"))
mongoose.connection.on('error', (error:Error) => console.log(error))

app.use('/',router())