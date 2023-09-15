const express= require('express')
const connectAndListen = require('./server')
require('dotenv').config()
const app=express()



connectAndListen(app)


