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
  db.getallorder(function (err, result) {
    // console.log(result);
    res.render("order.ejs", { list: result });
  });
});

router.get("/add_order", function (req, res) {
  res.render("add_order.ejs");
});

router.post("/add_order", function (req, res) {
  db.add_order(
    req.body.customer_name,
    req.body.catagory,
    req.body.chef_name,
    req.body.date,
    req.body.time,
    req.body.email,
    req.body.phone,
    function (err, result) {
      console.log(result);
      res.redirect("/order");
    }
  );
});

router.get("/edit_order/:id", function (req, res) {
  var id = req.params.id;
  db.getorderbyid(id, function (err, result) {
    console.log(result);
    res.render("edit_order.ejs", { list: result });
  });
});

router.post("/edit_order/:id", function (req, res) {
  var id = req.params.id;
  db.editorder(
    id,
    req.body.customer_name,
    req.body.catagory,
    req.body.chef_name,
    req.body.date,
    req.body.time,
    req.body.email,
    req.body.phone,
    function (err, result) {
      res.redirect("/order");
    }
  );
});

router.get("/delete_order/:id", function (req, res) {
  var id = req.params.id;
  db.getorderbyid(id, function (err, result) {
    console.log(result);
    res.render("delete_order.ejs", { list: result });
  });
});

router.post("/delete_order/:id", function (req, res) {
  var id = req.params.id;
  db.deleteorder(id, function (err, result) {
    res.redirect("/order");
  });
});

module.exports = router;
