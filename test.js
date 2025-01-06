var nodemailer = require("nodemailer");


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

let to = "abiralaminn@gmail.com";
let html = `<p>Hello</p>`;

sendMail(to, "this is subject", html);
