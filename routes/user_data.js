const express = require("express");
const router = express.Router();

const { getAllUserData, addUserData, getQrCodeForWhatsappWeb } = require("../controllers/user_data");

router.route("/api/getAllUserDetail").get(getAllUserData);
router.route("/api/postUserDetail").post(addUserData);
router.route("/api/GetQr").get(getQrCodeForWhatsappWeb);

module.exports = router;
