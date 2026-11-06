import express from "express";
import userController from "./controller";
import authController from "./controller";
import { auth } from "../../middleware/auth";

const authRoutes = express.Router();

const { login, changePassword } = authController;

authRoutes.post("/", login);
authRoutes.put("/", auth, changePassword);

export default authRoutes;
