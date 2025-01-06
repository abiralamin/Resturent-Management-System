let express = require("express");
let router = express.Router();
let bodyParser = require("body-parser");
let db = require.main.require("./models/db_controller.js");
const mysql = require("mysql2");
const nodemailer = require("nodemailer");
let randomToken = require("random-token");
const { check, validationResult } = require("express-validator");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", function (req, res) {
  res.render("signup.ejs");
});

router.post(
  "/",
  [
    check("username").notEmpty().withMessage("username is required"),
    check("password").notEmpty().withMessage("password is required"),
    check("email").notEmpty().withMessage("email is required"),
  ],
  function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      return res.status(442).json({ errors: errors.array() });
    }
    let email_status = "not_verified";
    let { username, email, password } = req.body;

    db.signup(username, email, password, email_status);

    let token = randomToken(8);

    db.verify(username, email, token);

    db.getuserid(email, function (err, result) {
      let id = result[0]["id"];
      console.log(id);

      let output = `<p>Dear ${username}</p>
                  <ul>
                     <li>User ID : ${id}</li>
                     <li>Token : ${token}</li>
                  </ul>
                     <p>Verify link : <a href="http://localhost:3000/verify">Verify </a></p>
                     <p><b>This is autometically generated mail</b></p> `;

      const transporter = nodemailer.createTransport({
        secure: true,
        host: "smtp.gmail.com",
        port: 465,
        auth: {
          user: "abiralamin020@gmail.com",
          pass: "pyce dxev oybw xpdh",
        },
      });

      function sendMail(to, sub, msg) {
        transporter.sendMail({
          to: to,
          subject: sub,
          html: msg,
        });
        console.log("email sent");
      }

      sendMail(`${email}`, "Email Varification", output);
      res.send("check your email for token to verify");
    });
  }
);

module.exports = router;
