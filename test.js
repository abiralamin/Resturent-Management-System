var nodemailer = require("nodemailer");

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'abiralamin020@gmail.com',
//     pass: '136324!#@DorA#@!'
//   }
// });

// var mailOptions = {
//   from: 'abiralamin020@gmail.com',
//   to: 'abiralaminn@gmail.com',
//   subject: 'Sending Email using Node.js',
//   text: 'That was easy!'
// };

// transporter.sendMail(mailOptions, function(error, info){
//   if (error) {
//     console.log(error);
//   } else {
//     console.log('Email sent: ' + info.response);
//   }
// });

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
