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

module.exports.matchtoken = function (id, token, callback) {
  let query = `select * from verify where token= '${token}' and id='${id}'`;
  con.query(query, callback);
  console.log(query);
};

module.exports.updateverify = function (email, email_status, callback) {
  let query = `update users set email_status ='${email_status}'
               where email='${email}'`;
  con.query(query, callback);
};

module.exports.findOne = function (email, callback) {
  var query = `select * from users where email='${email}'`;
  con.query(query, callback);
  console.log(query);
};

module.exports.temp = function (id, email, token, callback) {
  let query = `insert into temp (id, email , token ) values ('${id}', '${email}', ${token})`;
  con.query(query, callback);
};

module.exports.add_chef = function (
  first_name,
  last_name,
  email,
  dob,
  gender,
  address,
  phone,
  image,
  catagory,
  biography,
  callback
) {
  let query = `INSERT INTO  chef ( first_name , last_name , email , dob , gender , address , phone , image , catagory , biography )
               values ('${first_name}', '${last_name}', '${email}', '${dob}', '${gender}', '${address}', '${phone}', '${image}', '${catagory}', '${biography}')        
    `;
  con.query(query, callback);
  console.log(query);
};

module.exports.getAllChef = function (callback) {
  let query = "select * from chef";
  con.query(query, callback);
};

module.exports.getChefbyId = function (id, callback) {
  let query = `select * from chef where id = ${id}`;
  con.query(query, callback);
};

module.exports.editChef = function (
  id,
  first_name,
  last_name,
  email,
  dob,
  gender,
  address,
  phone,
  image,
  catagory,
  biography,
  callback
) {
  let query = `update chef set
     first_name='${first_name}', last_name='${last_name}', email='${email}', dob='${dob}', gender='${gender}', address='${address}', phone='${phone}', image='${image}', catagory='${catagory}', biography='${biography}'
     where id=${id}`;
  con.query(query, callback);
  // console.log(query);
};

module.exports.deleteChef = function (id, callback) {
  //console.log("i m here");
  let query = `delete from doctor where id=${id}`;
  con.query(query, callback);
};

module.exports.searchChef = function (key, callback) {
  // let query = 'SELECT  * from chef where first_name like "%' + key + '%"';
  let query = `SELECT * FROM chef WHERE first_name LIKE "%${key}%"`;
  con.query(query, callback);
  console.log(query);
};

module.exports.getAllCtg = function (callback) {
  var query = "select * from catagory";
  con.query(query, callback);
};

module.exports.getleavebyid = function (id, callback) {
  var query = `select * from leaves where id=${id}`;
  con.query(query, callback);
};

module.exports.deleteleave = function (id, callback) {
  var query = `delete  from leaves where id=${id}`;
  con.query(query, callback);
};
