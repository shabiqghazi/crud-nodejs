const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const path = require("path");

const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT;

app.use(morgan("tiny"));

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
app.use(
  "/bootstrap",
  express.static(path.resolve(__dirname, "node_modules/bootstrap/"))
);

app.get("/", (req, res) => {
  res.render("index", { name: "Shabiq" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
