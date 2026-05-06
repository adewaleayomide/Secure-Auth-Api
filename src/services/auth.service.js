
import User from "../models/auth.model.js";

export const createUser = async (data) => {
  return await User.create(data);
};

export const findInfo = async (query) => {
  return await User.findOne(query);
};