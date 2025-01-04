const mysql = require("mysql2");
let express = require("express");
let router = express.Router();
let bodyParser = require("body-parser");
const e = require("express");

let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql123",
  database: "rms",
});

con.connect(function (err) {
  if (err) {
    throw err;
  } else {
    console.log("you are connected to DB");
  }
});

module.exports.signup = function (username, email, password, status, callback) {
  let q1 = `SELECT email FROM users WHERE email='${email}'`;
  con.query(q1, (err, result) => {
    if (result[0] == undefined) {
      let q2 = `INSERT INTO users(username, email, password, email_status)
                VALUES ('${username}', '${email}', '${password}', '${status}')`;
      con.query(q2, callback);
      console.log(q2);
    } else {
      console.log("error");
    }
  });
};

module.exports.verify = function (username, email, token, callback) {
  let q1 = `INSERT INTO verify(username, email, token)
            VALUES ('${username}', '${email}', '${token}')`;

  con.query(q1, callback);
};

module.exports.getuserid = function (email, callback) {
  let q1 = `SELECT * FROM verify
            WHERE email='${email}'`;

  con.query(q1, callback);
};
