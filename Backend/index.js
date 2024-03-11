const express = require("express");
const CookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./configs/connectDBConfig.config");
const userRoute = require("./routes/user.routes");
const authRoute = require("./routes/auth.routes");
const chatRouter = require("./routes/chat.router");
const { app, server } = require("./socket/socket.io");
const authMiddleware = require("./middlewares/authMiddleware");


const bodyParser = require('body-parser');

// Sử dụng body-parser middleware để xử lý dữ liệu form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(CookieParser());


//connect DB
connectDB();

//routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/chats",authMiddleware.protect,chatRouter);

server.listen(process.env.PORT, () => {
  console.log(`Server listiening on ${process.env.PORT}`);
});
