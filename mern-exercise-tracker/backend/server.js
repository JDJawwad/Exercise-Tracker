const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

//middleware

//cors middleware
app.use(cors())
//body parser middleware
app.use(express.json())

//MongoDB Connection
const URI = process.env.ATLAS_URI
mongoose.connect(URI, {useNewUrlParser:true});

const connection = mongoose.connection
connection.once('open', ()=>{
    console.log('Database connection established')
})

const exercisesRouter = require('./routes/exercises')
const usersRouter = require('./routes/users')

app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter)

app.listen(port, ()=>{
    console.log(`Port is running on server ${port}`)
})