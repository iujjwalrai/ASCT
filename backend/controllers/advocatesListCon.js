const User = require("../models/User");

exports.advocatesListCon = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const totalAdvocates = await User.countDocuments();

    const users = await User.find()
      .select("name RegNo COPNo Jila createdAt AdPractice Gender")
      .skip(skip)
      .limit(parseInt(limit));

    const totalPages = Math.ceil(totalAdvocates / limit);

    return res.status(200).json({
      success: true,
      message: "Fetched all advocates successfully",
      users,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
