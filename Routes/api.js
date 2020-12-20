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
  router.get("/posts/:id",jwtAuthenticated, apiproduct.getProductByCategoryId);
  router.delete("/posts/:id",jwtAuthenticated, apiproduct.removeProduct);

  // User API
  router.post("/login", userController.loginUser);
  router.get("/user",jwtAuthenticated, userController.getUserIsLoggedIn); //Get user is logged in
  router.get("/users/:id",jwtAuthenticated, userController.getUserById);
  router.post("/user/add", userController.createAccount);
  router.post("/user/update/:id",jwtAuthenticated, userController.updateAccount);
  return router;
};
module.exports = apiRoutes;
