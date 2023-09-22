const registerValidation = require("../helpers/validation");
const AuthService = require("../services/AuthService");
const { getUserById } = require("../services/UserService");

exports.registerUser = async (req, res, next) => {
  try {
    const { error } = registerValidation(req.body);
    await getUserById(req.body.id);

    if (error) {
      return res.status(400).send(error.details[0].message);
    }

    const newUser = await AuthService.registerUser(req.body);
    return res.status(201).json({ user: newUser });
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
      return res.status(400).json({ message: "Email address already in use" });
    }

    return next(error);
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await AuthService.loginUser(email, password);
    if (!user) {
      return res.status(400).json({ message: "User was not found!" });
    }
    return res.status(200).json({ user, token });
  } catch (error) {
    return next(error);
  }
};

exports.getCurrentUser = async (req, res, next) => {
  try {
    const user = await AuthService.getCurrentUser(req.user.id);
    return res.status(200).json({ user });
  } catch (error) {
    return next(error);
  }
};
