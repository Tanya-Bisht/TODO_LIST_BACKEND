const express= require('express')
const connectAndListen = require('./server')
const routes=require('./routes/listRouter')
require('dotenv').config()
const app=express()
app.use(express.json());

app.use('/todo',routes)

connectAndListen(app)


