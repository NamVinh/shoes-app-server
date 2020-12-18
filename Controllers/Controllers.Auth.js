const bcrypt = require("bcrypt");
const User = require("../Models/Models.Admin");
const loginAccount = (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/Home");
  res.render("Signin", {
    title: "Đăng nhập",
    layout: "auth",
    message: req.flash("message"),
  });
};
const signUpAccount = (req, res) => {
  if (req.isAuthenticated()) return res.redirect("/Home");
  res.render("Signup", {
    title: "Đăng ký",
    layout: "auth",
    message: req.flash("message"),
  });
};

const getChangePassword = async (req, res) => {
 // if (req.isAuthenticated()) return res.redirect("/Home");
  res.render("Changepw", {
    title: "Đổi mật khẩu",
    layout: "auth",
    message: req.flash("message"),
  });
}

const ChangePwAccount = async (req, res) => {
  try {
    if(req.body.password === req.body.repassword) {
      if (isValidPassword(req.user, req.body.old_password)) {
        await User.findByIdAndUpdate(
          req.user._id,
          { password: createHash(req.body.password) },
          { new: true }
        );
        res.redirect("/Home");
      } else {
        res.render("Changepw", {
          title: "Đổi mật khẩu",
          layout: "auth",
          message: "Mật khẩu cũ không đúng",
        });
      }
    }else {
      res.render("Changepw", {
        title: "Đổi mật khẩu",
        layout: "auth",
        message: "Mật khẩu xác nhận không trùng khớp",
      });
    }
   
  } catch (error) {
    console.log(error.message);
  }
};

//Kiểm tra mật khẩu mã hoá có trùng nhau hay ko
const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

// Tạo mật khẩu mã hoá
const createHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

module.exports = {
  loginAccount,
  signUpAccount,
  ChangePwAccount,
  getChangePassword
};
