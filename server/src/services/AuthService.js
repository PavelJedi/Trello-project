const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");
const { generateToken } = require("../config/auth-config");

exports.registerUser = async (userData) => {
  const { name, email, password } = userData;
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  const newUser = await UserModel.create({
    name,
    email,
    password: hash,
  });
  return newUser;
};

exports.loginUser = async (email, password) => {
  try {
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const isPasswordValid = await comparePasswords(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = generateToken(user);

    return { user, token };
  } catch (error) {
    throw error;
  }
};

const comparePasswords = (pass1, pass2) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(pass1, pass2, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });

exports.getCurrentUser = async (userId) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("User not found");
  return user;
};
