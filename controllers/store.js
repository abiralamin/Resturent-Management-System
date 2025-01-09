var mysql = require("mysql");
var express = require("express");
var cookie = require("cookie-parser");
var db = require.main.require("./models/db_controller");

var router = express.Router();
router.get("*", function (req, res, next) {
  if (req.cookies["username"] == null) {
    res.redirect("/login");
  } else {
    next();
  }
});

router.get("/", function (req, res) {
  db.getallitem(function (err, result) {
    // console.log(result);
    res.render("store.ejs", { list: result });
  });
});

router.get("/add_item", function (req, res) {
  res.render("add_item.ejs");
});

router.post("/add_item", function (req, res) {
  var name = req.body.name;
  var m_date = req.body.m_date;
  var expire = req.body.expire;
  var expire_date = req.body.expire_date;
  var price = req.body.price;
  var quantity = req.body.quantity;

  db.addItem(
    name,
    m_date,
    expire,
    expire_date,
    price,
    quantity,
    function (err, result) {
      res.redirect("/store");
    }
  );
});

router.get("/edit_item/:id", function (req, res) {
  var id = req.params.id;
  db.getItembyId(id, function (err, result) {
    // console.log(result[0]);
    res.render("edit_item.ejs", { list: result[0] });
  });
});

router.post("/edit_item/:id", function (req, res) {
  var id = req.params.id;
  db.edititem(
    id,
    req.body.name,
    req.body.m_date,
    req.body.expire,
    req.body.e_date,
    req.body.price,
    req.body.quantity,
    function (err, result) {
      res.redirect("/store");
    }
  );
});

router.get("/delete_item/:id", function (req, res) {
  var id = req.params.id;
  db.getItembyId(id, function (err, result) {
    // res.send("hh");
    res.render("delete_item.ejs", { list: result[0]});
    // res.render("edit_item.ejs", { list: result[0]});

  });
});

router.post("/delete_item/:id", function (req, res) {
  var id = req.params.id;

  db.deleteitem(id, function (err, result) {
    res.redirect("/store");
  });
});

router.post("/search", function (req, res) {
  var key = req.body.search;
  db.searchitem(key, function (err, result) {
    console.log(result);

    res.render("store.ejs", { list: result });
  });
});

module.exports = router;
