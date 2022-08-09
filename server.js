const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");
const session = require('express-session')
const cookie = require('cookie-parser');

const router = require("./server/routes/router");
const connectDB = require("./server/database/connection");

const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT;

// session
app.use(session({
  secret: 's3cur3',
  resave: false,
  saveUninitialized: true
}))

//cookie
app.use(cookie())

app.use(morgan("tiny"));

app.use(bodyParser.urlencoded({ extended: true }));

connectDB();

app.set("view engine", "ejs");

app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
app.use(
  "/bootstrap",
  express.static(path.resolve(__dirname, "node_modules/bootstrap/"))
);

app.get('/tesmiddleware', (req,res) => {
  res.send(`Request Time : ${req.reqTime}`)
})
// Router
app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
