// dependencies

const createHttpError = require("http-errors");
const User = require("../../models/User");
const hashStr = require("../../utilities/hashStr");
const sendEmailToUser = require("./../../utilities/sendEmailToUser");
require("dotenv").config();

// register controller
const registerController = async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;
  try {
    const userObj = new User({
      firstName,
      lastName,
      username,
      email,
      password: await hashStr(password),
      role: "customer",
      status: "unverified",
    });

    const user = await userObj.save();

    await sendEmailToUser(
      [user.email],
      {
        subject: "Verify Your Account",
        template: `Verification link:${process.env.APP_URL}/emailConfirmation/${user._id}`,
        attachments: [],
      },
      (err, info) => {
        if (!err && info) {
          return res.render("pages/auth/confirmation", {
            email: user.email,
            title: `Confirmation - ${process.env.APP_NAME}`,
          });
        }
      }
    );
  } catch (error) {
    throw createHttpError(500, error);
  }
};

//exports
module.exports = registerController;
