const UserDataService = require("../service/user_data");
const UserDataValidations = require("../validator/user_data");

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

module.exports = {
    getAllUserData,
    addUserData,
};
