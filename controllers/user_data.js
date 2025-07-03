const UserDataService = require("../service/user_data");
const UserDataValidations = require("../validator/user_data");
const fs = require("fs");
const path = require("path");
const qrImagePath = path.join(__dirname, '../whatsapp_qr.png');
const qrImageBase64 = fs.readFileSync(qrImagePath, { encoding: 'base64' });
/////////////--------------------------------//////////////////////////////
// Get All UserDatas Controller
///////////////------------------------------//////////////////////////////
getAllUserData = async (req, res, next) => {
    try {
        const resp = await UserDataService.getAllUserData(req);
        res.status(200).json(resp);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

/////////////--------------------------------//////////////////////////////
// Add UserData Controller []
///////////////------------------------------//////////////////////////////
addUserData = async (req, res, next) => {
    try {
        let { first_name, last_name, birth_date } = req.body;

        let validateData = await UserDataValidations.addValidation.validate(req.body);
        if (validateData && validateData.error) {
            return res.status(422).json({ error: validateData.error.message });
        }
        const resp = await UserDataService.postUserData({
            req,
            first_name,
            last_name,
            birth_date,
        });
        res.status(200).json(resp);
    } catch (error) {
        console.log(error);
        next(error);
    }
};


getQrCodeForWhatsappWeb = async (req, res, next) => {
  try {
    const baseDir = path.resolve(__dirname, "../"); 
    const authPath = path.join(baseDir, ".wwebjs_auth");
    const cachePath = path.join(baseDir, ".wwebjs_cache");

    // Helper to delete folders recursively if they exist
    const deleteFolderIfExists = (folderPath) => {
      if (fs.existsSync(folderPath)) {
        fs.rmSync(folderPath, { recursive: true, force: true });
        console.log(`Deleted folder: ${folderPath}`);
      }
    };

    deleteFolderIfExists(authPath);
    deleteFolderIfExists(cachePath);

    const qrData = await UserDataService.getQrCodeForWhatsappWeb();
    res.status(200).json({ status: 1, qr: qrData, qrimage: qrImageBase64 });
  } catch (error) {
    res.status(500).json({ status: 0, message: "Failed to generate QR", error });
  }
};

module.exports = {
    getAllUserData,
    addUserData,
    getQrCodeForWhatsappWeb
};
