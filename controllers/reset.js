let express = require("express");
let flash = require("flash");
let router = express.Router();
let bodyParser = require("body-parser");
//let async = require ('async');
let nodemailer = require("nodemailer");
//let crypto = require ('crypto');
let randomToken = require("random-token");
let db = require.main.require("./models/db_controller");

router.get("/", function (req, res) {
  res.render("resetpassword.ejs");
});

router.post("/", function (req, res) {
  let email = req.body.email;
  db.findOne(email, function (err, result) {
    let r = result[0];
    console.log(r);
    if (r == undefined) {
      console.log("Mail does not exist");
      //   res.redirect("back");
      res.send("Mail does not exist");
    } else {
      // console.log(result1[0]);
      console.log(r);
      let id = r.id;
      let email = r.email;
      let token = randomToken(8);
      db.temp(id, email, token, function (err, result2) {
        var output = `
            <p>Dear User, </p>
            <p>Your are receiving this email because you had requested to reset your password.</p>
            <p>Your new password has been generated. Please login using the given new password.</p>
            <ul>
                <li>User ID: ${id}</li>
                <li>Token: ${token}</li>
            </ul>
            <p>Login Link: <a href="http://localhost:3000/login">LOGIN</a></p>
            <p>You may change your password after you login under the section - ACCOUNT SETTINGS</p>
            <p><strong>This is an automatically generated mail. Please do not reply back.</strong></p>
            <p>Regards,</p>
            <p>H Manager</p>
        `;
        ////
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

        sendMail(`${email}`, "Password Varification", output);
        // res.send("check your email for token to verify");
        res.send("A Token has been sent to your email account");

        ////
        //   var transporter = nodemailer.createTransport({
        //     service: "gmail",
        //     auth: {
        //       user: "",
        //       pass: "",
        //     },
        //   });

        //   var mailOptions = {
        //     from: "zihad.24bd@gmail.com", // sender address
        //     to: email, // list of receivers
        //     subject: "Password Reset", // Subject line
        //     html: output, // plain text body
        //   };

        //   transporter.sendMail(mailOptions, function (err, info) {
        //     if (err) {
        //       return console.log(err);
        //     }
        //     console.log(info);
        //   });
      });
    }
  });
  //   res.send("A Token has been sent to your account");
});

module.exports = router;
