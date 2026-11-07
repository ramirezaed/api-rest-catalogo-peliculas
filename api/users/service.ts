import { HttpError } from "../../errors/HttpError";
import userDao from "./dao";
import { IRegisterUserDao, IUpdateUserDao } from "./types";
import bcrypt, { compare } from "bcrypt";

import jwt from "jsonwebtoken";

const userService = {
  async create(data: IRegisterUserDao) {
    const emailExist = await userDao.findByEmail(data.email);
    if (emailExist)
      throw new HttpError(409, "El correo ya se encuentra registrado");
    if (data.password.length < 8)
      throw new HttpError(
        400,
        "La contraseña debe tener al menos 8 caracteres",
      );
    const password = await bcrypt.hash(data.password, 10);
    const newUser = await userDao.create({ ...data, password });
    const { password: _, ...userWhithoutPassword } = newUser.toObject();

    return userWhithoutPassword;
  },

  async findById(id: string) {
    const user = await userDao.findById(id);
    if (!user) throw new HttpError(404, "Usuario no encontrado");
    return user;
  },

  async delete(id: string) {
    const user = await userDao.findById(id);
    if (!user) throw new HttpError(404, "Ususario no encontrado");
    await userDao.delete(id);
    return { message: "Usuario eliminado" };
  },
  async update(id: string, data: IUpdateUserDao) {
    const user = await userDao.findById(id);
    if (!user) throw new HttpError(404, "Usuario no encontrado");
    return await userDao.update(id, data);
  },

  async index(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      userDao.index(skip, limit),
      userDao.count(),
    ]);
    return {
      users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit), //redondea hacia arriba
      },
    };
  },
};

export default userService;
