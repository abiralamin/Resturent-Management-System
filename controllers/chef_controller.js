let express = require("express");
let router = express.Router();
let bodyParser = require("body-parser");
let multer = require("multer");
let fs = require("fs");
let path = require("path");

let db = require.main.require("./models/db_controller");

router.get("*", function (req, res, next) {
  if (req.cookies["username"] == null) {
    res.redirect("/login");
  } else {
    next();
  }
});

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets/images/upload_images"); //here we specify the destination. in this case i specified the current directory
  },
  filename: function (req, file, cb) {
    console.log(file); //log the file object info in console
    cb(null, file.originalname); //here we specify the file saving name. in this case.
    //i specified the original file name .you can modify this name to anything you want
  },
});

let upload = multer({ storage: storage });

router.get("/", function (req, res) {
  db.getAllChef(function (err, result) {
    if (err) throw err;
    res.render("chef.ejs", { list: result });
  });
});

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/add_chef", function (req, res) {
  db.getAllCtg(function (err, result) {
    console.log(result);
    console.log(result.length);
    res.render("add_chef.ejs", { list: result });
  });
});

router.post("/add_chef", upload.single("image"), function (req, res) {
  db.add_chef(
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.dob,
    req.body.gender,
    req.body.address,
    req.body.phone,
    req.file.filename,
    req.body.catagory,
    req.body.biography
  );
  if (db.add_chef) {
    console.log("1 chef inserted");
  }
  res.redirect("/chefs");
});

router.get("/edit_chef/:id", function (req, res) {
  let id = req.params.id;

  db.getChefbyId(id, function (err, result) {
    console.log(result[0]);
    res.render("edit_chef.ejs", { list: result });
  });
});

router.post("/edit_chef/:id", function (req, res) {
  let id = req.params.id;
  db.editChef(
    id,
    req.body.first_name,
    req.body.last_name,
    req.body.email,
    req.body.dob,
    req.body.gender,
    req.body.address,
    req.body.phone,
    req.body.image,
    req.body.catagory,
    req.body.biography,
    function (err, result) {
      if (err) throw err;
      //res.render('edit_chef.ejs',{list:result});
      res.redirect("/chefs");
    }
  );
});

router.get("/delete_chef/:id", function (req, res) {
  let id = req.params.id;
  db.getChefbyId(id, function (err, result) {
    res.render("delete_chef.ejs", { list: result });
  });
});

router.post("/delete_chef/:id", function (req, res) {
  let id = req.params.id;
  db.deleteChef(id, function (err, result) {
    res.redirect("/chefs");
  });
});

//  router.get('/search',function(req,res){
//      res.rende
//      var key = req.body.search;
//      console.log(key);
//     db.searchDoc(key,function(err, rows, fields) {
//         if (err) throw err;
//       var data=[];
//       for(i=0;i<rows.length;i++)
//         {
//           data.push(rows[i].first_name);
//         }
//         res.end(JSON.stringify(data));
//       });
//     });

router.get("/", function (req, res) {
  db.getAllChef(function (err, result) {
    if (err) throw err;
    res.render("chef.ejs", { list: result });
  });
});

router.post("/search", function (req, res) {
  let key = req.body.search;
  db.searchChef(key, function (err, result) {
    console.log(result);

    res.render("chef.ejs", { list: result });
  });
});

module.exports = router;
