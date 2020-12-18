const express = require("express");
const router = express.Router();
const upload = require("../Config/multer");
//import controllers
const authController = require("../Controllers/Controllers.Auth");
const categoryController = require("../Controllers/Controllers.Category");
const productController = require("../Controllers/Controllers.Products");

//Hàm kiểm tra xem người dùng đã đăng nhập hay chưa
const isAuthenticated = function (req, res, next) {
  //Nếu đã đăng nhập thì tiếp tục điều hướng
  if (req.isAuthenticated()) return next();
  //Nếu chưa đăng nhập thì chuyển về trang đăng nhập 
  res.redirect("/");
};

const Routes = (passport) => {
  router.get("/", authController.loginAccount);

  router.post(
    "/Signin",
    passport.authenticate("Signin", {
      successRedirect: "/Home",
      failureRedirect: "/",
      failureFlash: true,
    })
  );

  router.get("/Signup", authController.signUpAccount);

  router.post(
    "/Signup",
    passport.authenticate("Signup", {
      successRedirect: "/Home",
      failureRedirect: "/Signup",
      failureFlash: true,
    })
  );
  router.get("/Changepw",isAuthenticated,authController.getChangePassword);

  router.post("/Changepw",isAuthenticated,authController.ChangePwAccount);
  router.get("/Signout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
  router.post("/upload", isAuthenticated, upload.single("image"), productController.addProduct);
  router.get("/Home",isAuthenticated, productController.getAll);
  router.get("/delete/:id",isAuthenticated, productController.delete);

  router.get("/Theloai",isAuthenticated, categoryController.getAll); 
  router.post("/addCategories",isAuthenticated, categoryController.addCategories);
  router.get("/Theloai/delete/:id",isAuthenticated, categoryController.delete);
  return router;
};

module.exports = Routes;
