const express = require("express");
const mongoose = require("mongoose");

require('dotenv').config()
const app = express();
const cors = require('cors');
const prefix = '/mongo'
app.use(cors({
    origin: '*'
}));


app.use(express.json());
mongoose.connect(
  `${process.env.DB_URL}`,
  { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Database Connected successfully");
});

//---- ROUTER IMPORTS ------

const prediction_router = require("./routes/prediction_router")

//---- ROUTER APP USE IMPLEMENTATION ------

app.use(`${prefix}/predictions`,prediction_router);


app.listen(9000, () => {
  console.log("Server is running at port 9000");
});

