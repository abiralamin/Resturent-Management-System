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
      // console.log(q2);
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
  // console.log(query);
};

module.exports.updateverify = function (email, email_status, callback) {
  let query = `update users set email_status ='${email_status}'
               where email='${email}'`;
  con.query(query, callback);
};

module.exports.findOne = function (email, callback) {
  let query = `select * from users where email='${email}'`;
  con.query(query, callback);
  // console.log(query);
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
  let query = `INSERT INTO  chef (first_name, last_name, email, dob, gender, address, phone, image, catagory_name, biography)
               values ('${first_name}', '${last_name}', '${email}', '${dob}', '${gender}', '${address}', '${phone}', '${image}', '${catagory}', '${biography}')        
    `;
  con.query(query, callback);
  // console.log(query);
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
     first_name='${first_name}', last_name='${last_name}', email='${email}', dob='${dob}', gender='${gender}', address='${address}', phone='${phone}', image='${image}', catagory_name='${catagory}', biography='${biography}'
     where id=${id}`;
  con.query(query, callback);
  // console.log(query);
};

module.exports.deleteChef = function (id, callback) {
  //console.log("i m here");
  let query = `delete from chef where id=${id}`;
  con.query(query, callback);
};

module.exports.searchChef = function (key, callback) {
  // let query = 'SELECT  * from chef where first_name like "%' + key + '%"';
  let query = `SELECT * FROM chef WHERE first_name LIKE "%${key}%"`;
  con.query(query, callback);
  // console.log(query);
};

module.exports.searchGenderWiseChef = function (key, callback) {
  // let query = 'SELECT  * from chef where first_name like "%' + key + '%"';
  let query = `SELECT * FROM chef WHERE gender = '${key}'`;
  con.query(query, callback);
  // console.log(query);
};

module.exports.searchCatagoryWiseChef = function (key, callback) {
  // let query = 'SELECT  * from chef where first_name like "%' + key + '%"';
  let query = `SELECT * FROM chef WHERE gender = '${key}'`;
  con.query(query, callback);
  // console.log(query);
};

module.exports.getAllCtg = function (callback) {
  let query = "select * from catagory";
  con.query(query, callback);
};

module.exports.getleavebyid = function (id, callback) {
  let query = `select * from leaves where id=${id}`;
  con.query(query, callback);
};

module.exports.getAllLeave = function (callback) {
  let query = "Select * from leaves";
  con.query(query, callback);
};

module.exports.add_leave = function (
  name,
  id,
  type,
  from,
  to,
  reason,
  callback
) {
  let query = `Insert into  leaves  ( employee , emp_id , leave_type , date_from , date_to , reason ) 
               values ('${name}', '${id}','${type}','${from}','${to}','${reason}')
    `;
  // console.log(query);
  con.query(query, callback);
};

module.exports.deleteleave = function (id, callback) {
  let query = `delete  from leaves where id=${id}`;
  con.query(query, callback);
};

module.exports.getAllemployee = function (callback) {
  let query = "select * from employee";
  con.query(query, callback);
};

module.exports.add_employee = function (
  name,
  email,
  contact,
  join_date,
  role,
  salary,
  callback
) {
  let query = `Insert into  employee (name, email, contact, join_date, role, salary)
     values ('${name}', '${email}', '${contact}', '${join_date}', '${role}', '${salary}')
    `;
  con.query(query, callback);
  // console.log(query);
};

module.exports.searchEmp = function (key, callback) {
  let query = `SELECT * from employee where name  like "%${key}%"`;
  con.query(query, callback);
  // console.log(query);
};

module.exports.searchSalary = function (key, callback) {
  if (key === "max-salary") {
    let query = `SELECT * 
                 FROM employee
                 WHERE salary = (SELECT MAX(salary) FROM employee)`;
    con.query(query, callback);
  } else if (key == "min-salary") {
    let query = `SELECT * 
                 FROM employee
                 WHERE salary = (SELECT MIN(salary) FROM employee)`;
    con.query(query, callback);
  } else if (key == "order-by-max-salary") {
    let query = `SELECT * FROM employee
                 ORDER BY salary DESC`;
    con.query(query, callback);
  } else {
    let query = `SELECT * FROM employee
                 ORDER BY salary ASC`;
    con.query(query, callback);
  }
};

module.exports.deleteEmp = function (id, callback) {
  //console.log("i m here");
  let query = `delete from employee where id=${id}`;
  con.query(query, callback);
};

module.exports.editEmp = function (
  id,
  name,
  email,
  contact,
  salary,
  join_date,
  role,
  callback
) {
  let query = `update employee set
     name='${name}', email='${email}', contact='${contact}', salary='${salary}', join_date='${join_date}', role='${role}'
     where id=${id}`;
  con.query(query, callback);
};

module.exports.getEmpbyId = function (id, callback) {
  let query = `select * from employee where id =${id}`;
  con.query(query, callback);
};

module.exports.edit_leave = function (
  id,
  name,
  leave_type,
  from,
  to,
  reason,
  callback
) {
  let query = `update leaves set
     employee='${name}', leave_type='${leave_type}', date_from='${from}', date_to='${to}', reason='${reason}'
     where id=${id}
    `;
  con.query(query, callback);
};

module.exports.add_order = function (
  customer_name,
  catagory,
  chef_name,
  date,
  time,
  email,
  phone,
  callback
) {
  // console.log(customer_name, catagory, chef_name, date, time, email, phone);
  let query = `insert into \`order\` (customer_name, catagory_name, chef_name, date, time, email, phone)
               values ('${customer_name}', '${catagory}', '${chef_name}', '${date}', '${time}', '${email}', '${phone}')`;
  con.query(query, callback);
};

module.exports.getallorder = function (callback) {
  let query = "select * from `order`";
  con.query(query, callback);
};

module.exports.editorder = function (
  id,
  customer_name,
  catagory,
  chef_name,
  date,
  time,
  email,
  phone,
  callback
) {
  let query = `update \`order\` set
    customer_name='${customer_name}', catagory_name='${catagory}', chef_name='${chef_name}', date='${date}', time='${time}', email='${email}', phone='${phone}'
    where id=${id}`;
  con.query(query, callback);
};

module.exports.deleteorder = function (id, callback) {
  let query = `delete from \`order\` where id=${id}`;
  con.query(query, callback);
};

module.exports.getallitem = function (callback) {
  let query = "select * from store order by id desc";
  // console.log(query);
  con.query(query, callback);
};

module.exports.addItem = function (
  name,
  m_date,
  expire,
  expire_end,
  price,
  quantity,
  callback
) {
  let query = `Insert into store (name,m_date,expire,expire_end,price,quantity)
     values('${name}', '${m_date}', '${expire}', '${expire_end}', '${price}', '${quantity}')
    `;
  con.query(query, callback);
  // console.log(query);
};

module.exports.getItembyId = function (id, callback) {
  let query = `select * from store where id=${id}`;
  con.query(query, callback);
};

module.exports.edititem = function (
  id,
  name,
  p_date,
  expire,
  e_date,
  price,
  quantity,
  callback
) {
  let query = `update store set 
      name= '${name}', m_date= '${p_date}', expire= '${expire}', expire_end= '${e_date}', price= '${price}', quantity= '${quantity}'
      where id=${id}`;
  // console.log(query);
  con.query(query, callback);
};

module.exports.deleteitem = function (id, callback) {
  //console.log("i m here");
  let query = `delete from store where id=${id}`;
  con.query(query, callback);
};

module.exports.searchitem = function (key, callback) {
  let query = `SELECT * from store where name like "%${key}%"`;
  con.query(query, callback);
};

module.exports.postcomplain = function (
  message,
  name,
  email,
  subject,
  callback
) {
  let query =
    "insert into complain (message,name,email,subject) values ('" +
    message +
    "','" +
    name +
    "','" +
    email +
    "','" +
    subject +
    "')";

  con.query(query, callback);
  // console.log(query);
};

module.exports.getcomplain = function (callback) {
  let query = "select * from complain";
  con.query(query, callback);
};

module.exports.checktoken = function (token, callback) {
  let query = "select * from temp where token='" + token + "'";
  con.query(query, callback);
  // console.log(query);
};

module.exports.setpassword = function (id, newpassword, callback) {
  let query =
    "update `users` set `password`='" + newpassword + "' where id=" + id;
  con.query(query, callback);
};

module.exports.getuserdetails = function (username, callback) {
  let query = "select * from users where username='" + username + "'";
  con.query(query, callback);
  // console.log(query);
};

module.exports.add_ctg = function (name, desc, callback) {
  let query =
    "insert into catagory (catagory_name,catagory_desc) values ('" +
    name +
    "','" +
    desc +
    "')";
  con.query(query, callback);
};

module.exports.getctgbyId = function (id, callback) {
  let query = "select * from catagory where id=" + id;
  con.query(query, callback);
};

module.exports.delete_catagory = function (id, callback) {
  let query = "delete from catagory where id=" + id;
  con.query(query, callback);
};

module.exports.edit_ctg = function (id, name, desc, callback) {
  let query =
    "update catagory set catagory_name='" +
    name +
    "',catagory_desc='" +
    desc +
    "' where id=" +
    id;
  con.query(query, callback);
};

module.exports.getuserdetails = function (username, callback) {
  let query = "select * from users where username='" + username + "'";
  con.query(query, callback);
  // console.log(query);
};

module.exports.edit_profile = function (
  id,
  username,
  email,
  password,
  callback
) {
  let query =
    "update users set username ='" +
    username +
    "', email = '" +
    email +
    "',password='" +
    password +
    "' where id=" +
    id;
  con.query(query, callback);
  // console.log(query);
};

module.exports.getorderbyid = function (id, callback) {
  let query = "select * from `order` where id=" + id;
  // console.log(query);
  con.query(query, callback);
};

module.exports.getAllCustomers = function (callback) {
  let query = `SELECT customer_name, email, phone FROM \`order\``;
  con.query(query, callback);
};

module.exports.searchOrderCatagoryWise = function (key, callback) {
  let query = `SELECT catagory_name, COUNT(catagory_name) AS total
               FROM \`order\`
               GROUP BY catagory_name
               ORDER BY COUNT(catagory_name) ${key}`;
  // console.log(query);
  con.query(query, callback);
};
