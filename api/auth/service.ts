import { HttpError } from "../../errors/HttpError";
import userDao from "../users/dao";
import bcrypt from "bcrypt";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

const authService = {
  async login(email: string, password: string) {
    const user = await userDao.findEmailWithPassword(email);
    if (!user) throw new HttpError(400, "credenciales incorrectas");

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) throw new HttpError(400, "credenciales incorrectas");

    const payload = {
      _id: user.id,
      isAdmin: user.isAdmin,
    };

    const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET!, {
      expiresIn: "15m",
    });

    return { payload, accessToken };
  },

  async changePassword(
    id: string,
    currentPassword: string,
    newPassword: string,
  ) {
    const user = await userDao.findUserWithPassword(id);
    if (!user) throw new HttpError(404, "Usuario no encontrado");
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new HttpError(400, "Contraseña actual incorrecta");

    if (newPassword.length < 8)
      throw new HttpError(400, "la contraseña debe tener al menos 8 digitos");
    const password = await bcrypt.hash(newPassword, 10);
    await userDao.changePassword(id, password);
    return { message: "Contraseña actualizada" };
  },
};

export default authService;
