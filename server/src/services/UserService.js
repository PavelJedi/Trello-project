const User = require("../models/UserModel");

exports.getAllUsers = async () => {
  return await User.find().select("-password");
};

exports.createUser = async (userData) => {
  const user = new User(userData);
  return await user.save();
};

exports.getUserById = async (id) => {
  return await User.findById(id).select("-password");
};

exports.updateUser = async (id, updatedUserData) => {
  return await User.findByIdAndUpdate(id, updatedUserData, {
    new: true,
    runValidators: true,
  }).select("-password");
};

exports.deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);
};
