const express = require('express')
const CookieParser = require("cookie-parser")
require('dotenv').config()
const { connectDB } = require('./configs/connectDBConfig.config')
const userRoute = require('./routes/userRoute')
const authRoute = require('./routes/authRouter')

const app = express()
app.use(express.json())

//connect DB
connectDB()

app.use(CookieParser())


//routes
app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)



app.listen(process.env.PORT,()=>{console.log(`Server listiening on ${process.env.PORT}`);})
