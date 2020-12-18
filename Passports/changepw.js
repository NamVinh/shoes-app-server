const User = require("../Models/Models.Admin");
const bcrypt = require("bcrypt");

const Changepw = (req, email, password, done) => {
  // Tìm dữ liệu theo email trong mongo
  User.findOne({ email: email }, (err, user) => {
    // Nếu có lỗi thì bỏ qua không đăng nhập
    if (err) return done(err);
    // Nếu người dùng không tồn tại thì bỏ qua không đăng nhập và trả về thông tin
    if (!user) {
      return done(
        null,
        false,
        req.flash("message", "Không có tài khoản này!!!")
      );
    }
    // Trả về thông báo nếu kiểm tra sai mật khẩu người dùng
    if (isValidPassword(user, password)) {
      return done(
        null,
        false,
        req.flash(
          "message",
          "Mật khẩu mới trùng với mật khẩu cũ ."
        )
      );
    } else {
      User.findByIdAndUpdate(
        {},
        {password: req.params.password},
        (err, user) => {
          if (!err) { response.redirect('/Home');}
          else {console.log(err)}
        } 
        )
    }
    // Callback trả về kết quả kiểm tra
    return done(null, user);
  });
};

//Kiểm tra mật khẩu mã hoá có trùng nhau hay ko
const isValidPassword = (user, password) => {
  return bcrypt.compareSync(password, user.password);
};

module.exports = Changepw;