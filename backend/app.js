const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
// const path = require("path");
const dotenv =require("dotenv")


dotenv.config({ path: "backend/config/config.env" });
// Config

// if (process.env.NODE_ENV !== "PRODUCTION") {
// }

app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({ extended: true,limit:'50mb'}));
app.use(fileUpload({limits:{fileSize:50*1024*1024}}));

// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

// app.use(express.static(path.join(__dirname, "../frontend/build")));

// app.get("*", (req, res) => {
//   res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
// });

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
