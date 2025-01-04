let express = require("express");
let router = express.Router();
let bodyParser = require("body-parser");
let db = require.main.require("./models/db_controller.js");
const mysql = require("mysql2");
let session = require("express-session");
let sweetalert = require("sweetalert2");
const { check, validationResult } = require("express-validator");

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


