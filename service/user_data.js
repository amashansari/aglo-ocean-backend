
/////// GET ///////
const getAllUserData = async (req) => {
    let result = {
        status: 0,
        message: "",
        data: "",
    };
    try {
        const userData = req.app.locals.userData;
        if (userData && userData.length > 0) {
            result.data = userData;
            result.message = "success";
            result.status = 1;
        } else {
            result.message = "No data found";
            result.status = 0;
        }
    } catch (error) {
        result.message = error;
        result.status = 0;
    }
    return result;
};

/////// POST ///////
const postUserData = async ({ req,first_name, last_name, birth_date }) => {
    let result = {
        status: 0,
        message: "",
        data: "",
    };
    try {
        const userData = req.app.locals.userData;
        userData.push({ first_name, last_name, birth_date });
        if (userData && userData.length > 0) {
            result.data = userData;
            result.message = "success";
            result.status = 1;
        } else {
            result.message = "No data found";
            result.status = 0;
        }
    } catch (error) {
        result.message = error;
        result.status = 0;
    }
    return result;
}

module.exports = {
    getAllUserData,
    postUserData,
};
