const express = require('express')
require('dotenv').config()
const { connectDB } = require('./configs/connectDBConfig.config')
const userRoute = require('./routes/userRoute')

const app = express()
app.use(express.json())

//connect DB
connectDB()


//routes
app.use('/api/users', userRoute)



app.listen(process.env.PORT,()=>{console.log(`Server listiening on ${process.env.PORT}`);})
