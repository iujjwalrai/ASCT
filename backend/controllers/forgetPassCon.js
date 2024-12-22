const User = require("../models/User");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
function generateOTP() {
  return Math.floor(10000 + Math.random() * 90000);
}
exports.sendotp = async (req, res) => {
  const { mobile, email } = req.body;
  if (!mobile || !email) {
    return res.status(401).json({
      success: false,
      message: "Please fill all details",
    });
  }
  try {
    const foundUser = await User.findOne({ mobile, email });

    if (!foundUser) {
      return res.status(404).json({
        success: false,
        message: "No user exists with these credentials",
      });
    }

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 587,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    const OTP = generateOTP();
    const OTPExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    foundUser.OTP = OTP;
    foundUser.OTPExpiresAt = OTPExpiresAt;
    await foundUser.save();

    const mailOptions = {
      from: `Advocates Self Care Team - Uttar Pradesh <${process.env.MAIL_USER}>`,
      to: email,
      subject: "OTP for Resettng Your ASCT Password",
      html: `<h1>Greetings from ASCT - UP</h1><br><p>Your OTP for resetting your ASCT password is <b>${OTP}</b>. It is valid for 10 minutes only. Please Don't share this OTP with anyone.</p><br><br><h3>Thanks & Regards</h3><h4>ASCT - UP</h4>`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: `OTP send to ${email} successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server error" });
  }
};

exports.verifyOTP = async (req, res) => {
  const { mobile, email, OTP } = req.body;

  if (!email || !OTP || !mobile) {
    return res.status(401).json({
      success: false,
      message: "All details are not there",
    });
  }
  try {
    const user = await User.findOne({ mobile, email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.OTP !== OTP || new Date() > user.OTPExpiresAt) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (er) {
    console.error(er);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, OTP, mobile, newPass, newPassAgain } = req.body;
    if (!newPass || !newPassAgain) {
      return res.status(401).json({
        success: false,
        message: "Please fill all the details carefully",
      });
    }

    if (newPassAgain !== newPass) {
      return res.status(403).json({
        success: false,
        message: "Password and Confirm Password must be same!",
      });
    }

    const user = await User.findOne({ mobile, email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!!",
      });
    }

    if (user.OTP !== OTP || new Date() > user.OTPExpiresAt) {
        return res.status(400).json({
          success: false,
          message: "Invalid or expired OTP",
        });
    }
    user.OTP = null;
    user.OTPExpiresAt = null;
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(newPass, 10);
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        success: false,
        message: "Error in hashing the password",
      });
    }

    user.password = hashedPassword;
    await user.save();
    return res.status(200).json({
      success: true,
      messgae: "Password updated successfully",
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error while updating the password",
    });
  }
};
