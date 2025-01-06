let express = require("express");
let session = require("express-session");
let cookie = require("cookie-parser");
let path = require("path");
let ejs = require("ejs");
let multer = require("multer");
let async = require("async");
let nodemailer = require("nodemailer");
let crypto = require("crypto");
let expressValidator = require("express-validator");
let sweetalert = require("sweetalert2");
let bodyParser = require("body-parser");
const http = require("http");

let db = require("./models/db_controller.js");
let signup = require("./controllers/signup.js");
let login = require("./controllers/login.js");
let verify = require("./controllers/verify.js");
let reset = require("./controllers/reset.js");
let chef_controller = require("./controllers/chef_controller.js");
let employee = require("./controllers/employee.js");
let landing = require("./controllers/landing.js");
let home = require("./controllers/home.js");

let app = express();

app.set("view engine", "ejs");

const server = http.createServer(app);

app.use(express.static("./public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookie());

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

app.use("/", landing);
app.use("/signup", signup);
app.use("/login", login);
app.use("/verify", verify);
app.use("/reset", reset);
app.use("/home", home);
app.use("/chefs", chef_controller);
app.use("/employee", employee);
