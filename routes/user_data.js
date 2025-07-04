const express = require("express");
const router = express.Router();


const { getAllUserData, addUserData } = require("../controllers/user_data");


router.route("/api/getAllUserDetail").get(getAllUserData);
router.route("/api/postUserDetail").post(addUserData);


module.exports = router;
