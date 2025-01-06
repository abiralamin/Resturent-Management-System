let express = require("express");
let router = express.Router();
let bodyParser = require("body-parser");
let db = require.main.require("./models/db_controller.js");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.get("/", function (req, res) {
  res.render("verify.ejs");
});

router.post("/", function (req, res) {
  let { id, token } = req.body;
  db.matchtoken(id, token, function (err, result) {
    console.log(result);
    if (result.length > 0) {
      let email = result[0].email;
      let email_status = "verified";
      db.updateverify(email, email_status, function (err, result1) {
        // res.send("email varified");
        res.redirect("/login");
      });
    } else {
      res.send("Token did not match");
    }
  });
});
module.exports = router; 