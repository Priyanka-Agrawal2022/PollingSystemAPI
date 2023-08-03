const express = require("express");
const port = 8000;
const app = express();
const cookieParser = require("cookie-parser");
const db = require("./config/mongoose");

// parse incoming req object into string
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

// use express router
app.use("/", require("./routes/index"));

app.listen(port, function (err) {
  if (err) {
    console.log(`Error: ${err}`);
    return;
  }

  console.log(`Server is running on port: ${port}`);
});
