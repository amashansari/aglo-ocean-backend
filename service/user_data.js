const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');

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
const postUserData = async ({ req, first_name, last_name, birth_date }) => {
    let result = {
        status: 0,
        message: "",
        data: "",
    };
    try {
        const userData = req.app.locals.userData;
        let addData = { first_name, last_name, birth_date }
        userData.push(addData);
        if (userData && userData.length > 0) {
            result.data = addData;
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

const getQrCodeForWhatsappWeb = () => {

    return new Promise((resolve, reject) => {
        const whatsapp = new Client({
            authStrategy: new LocalAuth(),
            puppeteer: {
                headless: true,
                args: ['--no-sandbox'],
            }
        });

        // Temporary storage for user data
        const userResponses = {};

        // QR Code Handling
        whatsapp.on('qr', qr => {
            qrcode.generate(qr, { small: true });
            resolve(qr);
        });

        // Message Handling
        whatsapp.on('message', async message => {
            let result = {
                status: 0,
                message: "",
                data: "",
            };


            const userNumber = message.from.replace(/@c\.us$/, '');

            // Ignore groups and status updates
            if (userNumber.includes("@g.us") || userNumber.includes("status@broadcast")) {
                return;
            }

            const userMessage = message.body.trim().toLowerCase();

            if (!userResponses[userNumber]) {
                userResponses[userNumber] = {};
            }

            const userData = userResponses[userNumber];

            // First message: say hello and ask for name
            if (userMessage === "hello") {
                const randomOTP = Math.floor(100000 + Math.random() * 900000); // 6-digit random number
                userData.otp = randomOTP;
                userData.state = "otp_sent";

                await message.reply(`Hello! Your verification code is: *${randomOTP}*`);
                console.log(`Sent OTP ${randomOTP} to ${userNumber}`);
                //   const conn = await pool.getConnection();
                //   try {
                //     const currentTime = utils.commonFormateDate(new Date());
                //     const query = `
                //   INSERT INTO otp_verification (
                //     phone_number,
                //     otp_code,
                //     sent_at
                //   ) VALUES ( ?, ?, ?)
                // `;
                //     const [res] = await conn.query(query, [
                //       userNumber,
                //       randomOTP,
                //       currentTime
                //     ]); if (res && res.insertId) {
                //       result.data = { id: res.insertId };
                //       result.message = "Otp Inserted Successfully!";
                //       result.status = 1;
                //     } else {
                //       result.message = "Something went wrong.";
                //     }
                //   } catch (error) {
                //     result.message = error;
                //   } finally {
                //     conn.release();
                //   }
            }
        });

        whatsapp.on('ready', () => {
            console.log("Client is ready");
        });

        whatsapp.initialize();
    });
};

module.exports = {
    getAllUserData,
    postUserData,
    getQrCodeForWhatsappWeb
};
