import userModel from './model.js';

export const createUser = (user) => userModel.create(user);
export const findAllUsers = () => userModel.find();
export const findUserById = (id) => userModel.findById(id);
export const findUserByEmail = (email) => userModel.findOne({ email });
export const findUserByUsername = (username) => userModel.findOne({ username });
export const findUserByCredentials = (username, password) => userModel.findOne({ username, password });
export const updateUser = (id, user) => userModel.updateOne({ _id: id }, { $set: user });
export const deleteUser = (id) => userModel.deleteOne({ _id: id });