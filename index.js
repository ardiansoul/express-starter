// import dependencies
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}

// set app
const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.use(bodyParser.json());
app.use(morgan("tiny"));

// import routes
const apiRoute = require("./app/routes/index");
const authRoute = require("./app/routes/Auth");

// use routes
app.get("/", (req, res) => {
  res.send("app runing");
});

app.use("/api/v1", apiRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`app running in port ${port}`);
});
