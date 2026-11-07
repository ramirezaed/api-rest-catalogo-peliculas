import { FilterQuery } from "mongoose";
import { User } from "./model";
import { IRegisterUserDao, IUpdateUserDao } from "./types";

const userDao = {
  findByEmail: (email: string) => User.findOne({ email }),
  findById: (id: string) => User.findOne({ _id: id, deletedAt: null }),
  create: (user: IRegisterUserDao) => User.create(user),
  delete: (id: string) => User.findOneAndDelete({ _id: id, deletedAt: null }),
  update: (id: string, user: Partial<IUpdateUserDao>) =>
    User.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { $set: user },
      { new: true },
    ),

  index: (skip: number, limit: number) =>
    User.find({ deletedAt: null }).skip(skip).limit(limit),
  count: () => User.countDocuments({ deletedAt: null }),

  findUserWithPassword: (id: string) =>
    User.findOne({ _id: id, deletedAt: null }).select("+password"),

  findEmailWithPassword: (email: string) =>
    User.findOne({ email, deletedAt: null }).select("+password"),

  changePassword: (id: string, newPassword: string) =>
    User.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { password: newPassword },
      { new: true },
    ).select("+password"),
};

export default userDao;
