const express = require("express");
const CookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./configs/connectDBConfig.config");
const { app, server } = require("./socket/socket.io");
const userRoute = require("./routes/user.routes");
const authRoute = require("./routes/auth.routes");

dotenv.config();
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());
app.use(CookieParser());

//connect DB
connectDB();

//routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);

server.listen(process.env.PORT, () => {
  console.log(`Server listiening on ${process.env.PORT}`);
  // get ip address of the server
  const os = require("os");
  const ifaces = os.networkInterfaces();
  let ipAddress = "";
  Object.keys(ifaces).forEach(function (ifname) {
    let alias = 0;
    ifaces[ifname].forEach(function (iface) {
      if ("IPv4" !== iface.family || iface.internal !== false) {
        return;
      }
      if (alias >= 1) {
        ipAddress = iface.address;
      } else {
        ipAddress = iface.address;
      }
      ++alias;
    });
  });
  console.log(`Server is running on ${ipAddress}:${process.env.PORT}`);
});
