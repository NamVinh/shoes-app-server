const User = require("../Models/Models.User");
const passportJwt = require("passport-jwt");

let jwtOptions = {
  jwtFromRequest: passportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "Nam Vinh",
};

const signInApi = (passport) => {
  passport.use(
    new passportJwt.Strategy(jwtOptions, async (payload, next) => {
      let user = await User.findById(payload._id);
      if (user) {
        next(null, user);
      } else {
        next(null, false);
      }
    })
  );
};

module.exports = signInApi;
