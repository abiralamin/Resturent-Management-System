var express = require("express");
var router = express.Router();
var db = require.main.require("./models/db_controller");
var bodyPaser = require("body-parser");

router.get("*", function (req, res, next) {
  if (req.cookies["username"] == null) {
    res.redirect("/login");
  } else {
    next();
  }
});

router.get("/", function (req, res) {
  db.getAllChef(function (err1, result) {
    let r1 = result;
    db.getallorder(function (err2, result1) {
      let r2 = result1;
      console.log(r1);
      console.log(r2);

      let total_chef = r1.length;
      let order = r2.length;

      res.render("home.ejs", {
        t_chef: total_chef,
        doclist: r1,
        t_order: order,
        applist: r2,
      });
    });
  });
});

router.get("/catagory", function (req, res) {
  db.getAllCtg(function (err, result) {
    res.render("catagory.ejs", { list: result });
  });
});

router.get("/add_catagory", function (req, res) {
  res.render("add_catagory.ejs");
});

router.post("/add_catagory", function (req, res) {
  var name = req.body.ctg_name;
  var desc = req.body.desc;
  db.add_ctg(name, desc, function (err, result) {
    res.redirect("/home/catagory");
  });
});

router.get("/delete_catagory/:id", function (req, res) {
  var id = req.params.id;
  db.getctgbyId(id, function (err, result) {
    res.render("delete_catagory.ejs", { list: result });
  });
});

router.post("/delete_catagory/:id", function (req, res) {
  var id = req.params.id;
  db.delete_catagory(id, function (err, result) {
    res.redirect("/home/catagory");
  });
});

router.get("/edit_catagory/:id", function (req, res) {
  var id = req.params.id;
  db.getctgbyId(id, function (err, result) {
    res.render("edit_catagory.ejs", { list: result });
  });
});

router.post("/edit_catagory/:id", function (req, res) {
  db.edit_ctg(
    req.params.id,
    req.body.ctg_name,
    req.body.desc,
    function (err, result) {
      res.redirect("/home/catagory");
    }
  );
});

router.get("/profile", function (req, res) {
  var username = req.cookies["username"];
  db.getuserdetails(username, function (err, result) {
    //console.log(result);
    res.render("profile.ejs", { list: result });
  });
});

router.post("/profile", function (req, res) {
  var username = req.cookies["username"];
  db.getuserdetails(username, function (err, result) {
    var id = result[0].id;
    var password = result[0].password;
    var username = result[0].username;
    if (password == req.body.password) {
      db.edit_profile(
        id,
        req.body.username,
        req.body.email,
        req.body.new_password,
        function (err, result1) {
          if (result1) {
            res.send("profile edited successfully");
          }
        }
      );
    } else {
      res.send("old password did not match");
    }
  });
});

module.exports = router;
