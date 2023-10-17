const express= require('express')
const connectAndListen = require('./server')
const routes=require('./routes/listRouter')
const cors=require('cors')
require('dotenv').config()
const app=express()
app.use(express.json());
app.use(cors({                                         //used for axios 
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,  // Enable cookies and session data to be sent cross-origin
  }));

app.use('/todo',routes)
app.use('/user',routes)

connectAndListen(app)


