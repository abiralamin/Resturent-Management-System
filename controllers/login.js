let express = require("express");
let router = express.Router();
let bodyParser = require("body-parser");
let db = require.main.require("./models/db_controller.js");
const mysql = require("mysql2");
let session = require("express-session");
let sweetalert = require("sweetalert2");
const { check, validationResult } = require("express-validator");

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql123",
  database: "rms",
});

router.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get('/', function(req ,res){

  res.render('login.ejs');
});

router.post(
  "/",
  [
    check("username").notEmpty().withMessage("username is required"),
    check("password").notEmpty().withMessage("password is required"),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(422).json({ errors: errors.array() });
    }
    let { username, password } = req.body;
    // console.log(username);
    // console.log(password);
    if (username && password) {
      let q = `SELECT * FROM users
               WHERE username = '${username}' AND password = '${password}' `;
      con.query(q, function (error, results, fields) {
        if (results.length > 0) {
        //   console.log(results);
          req.session.loggedin = true;
          req.session.username = username;
          res.cookie("username", username);
          let status = results[0].email_status;

          if (status == "not_verified") {
            res.send("please varify your email");
          } else {
            sweetalert.fire("logged in");
            res.redirect("/home");
          }
        } else {
          res.send("incorrect username/password");
        }
        res.end();
      });
    } else {
      res.send("please enter your username and password");
      res.end();
    }
  }
);

module.exports = router;
