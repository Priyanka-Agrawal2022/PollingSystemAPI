const mongoose = require("mongoose");

// mongoose.connect("mongodb://0.0.0.0/polling_api_dev");

mongoose.connect(
  "mongodb+srv://prnkgrwl286:2MOOHXxgoD1Ni9n0@cluster0.zecaxjp.mongodb.net/polling_api_dev"
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to db!"));

db.once("open", function () {
  console.log("Successfully connected to database: MongoDB");
});

module.exports = db;
