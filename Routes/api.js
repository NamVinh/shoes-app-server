const express = require("express");
const router = express.Router();
const apiproduct = require("../Controllers/api/api.product");
const userController = require("../Controllers/api/api.user");

const apiRoutes = (passport) => {
  const jwtAuthenticated = (req, res, next) => {
    return passport.authenticate("jwt", { session: false }, (err, user) => {
        if(!user || err) {
            return res.send({status: false, msg: 'Chưa đăng nhập tài khoản'})
        }
        req.user = user;
        next()
    })(req, res, next);
  };
  //Post API
  router.get("/posts", apiproduct.getProduct);
  router.get("/posts/:id", apiproduct.getProductByCategoryId);
  router.delete("/posts/:id", apiproduct.removeProduct);

  // User API
  router.post("/login", userController.SingIn);
  router.get("/user/:id", userController.get_user_id); //Get user is logged in
  router.get("/users", userController.getData_user);
  router.post("/signup", userController.SingUp);
  router.post("/user/update/:id", userController.update_user);
  router.post("/changepassword/:id", userController.change_password);
  return router;
};
module.exports = apiRoutes;
