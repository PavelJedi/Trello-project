require("dotenv").config();
const { ExtractJwt } = require("passport-jwt");
const jwt = require("jsonwebtoken");
const User = require("../models/UserModel");

const secretKey = process.env.SECRET_KEY;

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: secretKey,
};

const verifyCallback = async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};

const generateToken = (user) => {
  const payload = { id: user.id, username: user.username };
  const token = jwt.sign(payload, secretKey, { expiresIn: "30d" });
  return token;
};

module.exports = {
  jwtOptions,
  verifyCallback,
  generateToken,
};
