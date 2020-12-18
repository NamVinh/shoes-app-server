var signIn = require("./signin");
var signUp = require("./signup");
var apilogin = require("./apilogin");
var User = require("../Models/Models.Admin");

const initSetup = (passport) => {
  // thiết lập mặc định cho passport, 2 hàm đễ mã hóa, giải mã
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
  signIn(passport);
  signUp(passport);
  apilogin(passport);
};
module.exports = initSetup;
