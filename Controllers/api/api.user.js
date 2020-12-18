const User = require("../../Models/Models.User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  let secretOrKey = "Nam Vinh";
  if (email && password) {
    let user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ status: false, msg: "Không tìm thấy ngươi dùng nào" });
    }
    if (isValidPassword(user, password)) {
      let payload = { _id: user._id };
      let token = jwt.sign(payload, secretOrKey);
      res.json({ status: true,  token: token });
    } else {
      res.status(401).json({ status: false, msg: "Mật khẩu không đúng" });
    }
  }
};

const getUserById = async (req, res) => {
  try {
    let usersData = await User.findById(req.params.id).select("-password -__v");
    return res.status(200).json({ status: true, data: usersData });
  } catch (error) {
    return res.status(200).json({ status: false, msg: error.message });
  }
};
const getUserIsLoggedIn = async (req, res) => {
  try {
    let usersData = await User.findById(req.user._id).select("-password -__v");
    return res.status(200).json({ status: true, data: usersData });
  } catch (error) {
    return res.status(200).json({ status: false, msg: error.message });
  }
};
const createAccount = async (req, res) => {
  try {
    let userData = await User.create({
      ...req.body,
      password: createHash(req.body.password),
    });
    return res.status(200).json({ status: true, data: userData });
  } catch (error) {
    return res.status(200).json({ status: false, msg: error.message });
  }
};
const updateAccount = async (req, res) => {
  try {
    let userData = await User.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        password: createHash(req.body.password),
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ status: true, data: userData });
  } catch (error) {
    return res.status(200).json({ status: false, msg: "Có lỗi xảy ra" });
  }
};

// Tạo mật khẩu mã hoá
const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};
// So sánh mật khẩu
const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};
module.exports = {
  getUserById,
  getUserIsLoggedIn,
  createAccount,
  updateAccount,
  loginUser,
};
