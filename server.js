//require express
const express = require("express");

//require connecting to Database
const connectDB = require("./config/connectDB");

//instance app of all express method
const app = express();
require("dotenv").config();

//connect with Database
connectDB();

//middleware to read json type
app.use(express.json())

//middleware for the person routes
app.use("/api/person", require("./router/person"));

//PORT
const port = process.env.port;

//Starting the server
app.listen(port, () => console.log("server is running on", port));
