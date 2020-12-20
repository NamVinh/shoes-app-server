const User = require("../../Models/Models.User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const loginUser = async (req, res) => {
  const { gmail, password } = req.body;
  let secretOrKey = "Nam Vinh";
  if (gmail && password) {
    let user = await User.findOne({ gmail });
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
  // try {
    
  //   let userData = await User.create({
  //     ...req.body,
  //     password: createHash(req.body.password),
  //   });
  //   return res.status(200).json({ status: true, data: userData});
  // } catch (error) {
  //   return res.status(200).json({ status: false, msg: error.message });
  // }
  var gmail = req.body.gmail ? {gmail: req.body.gmail} : {};

  const new_user = new User({
    avatar: req.body.avatar,
    name: req.body.name,
    password: req.body.password,
    phone: req.body.phone,
    gmail: req.body.gmail,
  });

  User.find(gmail).then((data) => {
    console.log(data + 'jdfsjdfj');
    if (data.length !== 0) {
      return res.status(400).send({
        api_status: 400,
        api_message: 'Email đã tồn tại',
        api_version: 'v1.0',
      });
    } else {
      new_user
        .save(new_user)
        .then((data) => {
          if (data) {
            res.status(200).send({
              api_status: 200,
              api_message: 'Tạo tài khoản thành công',
              api_version: 'v1.0',
              data: data,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            api_status: 500,
            api_message: 'Thất bại err',
            api_version: 'v1.0',
          });
          console.log(err);
        });
    }
  });
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
    return res.status(200).json({ status: false, msg: "Có lỗi xảy ra"+ error.message });
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
