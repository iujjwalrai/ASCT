const bcrypt = require("bcrypt");
const User = require("../models/User");

function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

function isStrongPassword(password) {
  // At least 8 chars, one uppercase, one lowercase, one number, one special char
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
}

exports.registerCon = async (req, res) => {
  const {
    name,
    mobile,
    RegNo,
    RegNoYear,
    COPNo,
    COPNoYear,
    email,
    password,
    DOB,
    Gender,
    BloodGroup,
    AdPractice,
    Jila,
    Tehsil,
    HomeAddress,
    HomeDistrict
  } = req.body;

  try {
    // Mobile validation
    if (!/^\d{10}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Mobile number must be exactly 10 digits"
      });
    }

    // Password strength validation
    if (!isStrongPassword(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
      });
    }

    // Age validation
    const age = calculateAge(DOB);
    if (age < 18) {
      return res.status(400).json({
        success: false,
        message: "User must be at least 18 years old"
      });
    }

    const fetchedUser = await User.findOne({ mobile });

    if (fetchedUser) {
      return res.status(403).json({
        success: false,
        message: "User already registered with this Mobile number"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      name,
      mobile,
      RegNo,
      RegNoYear,
      COPNo,
      COPNoYear,
      email,
      password: hashedPassword,
      DOB,
      Gender,
      BloodGroup,
      AdPractice,
      Jila,
      Tehsil,
      HomeAddress,
      HomeDistrict
    });

    return res.status(200).json({
      success: true,
      createdUser,
      message: "User created successfully"
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Internal server error"
    });
  }
};
