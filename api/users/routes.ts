import express from "express";
import userController from "./controller";
import { auth } from "../../middleware/auth";
import { isAdmin } from "../../middleware/isAdmin";

const userRoutes = express.Router();

const { create, show, destroy, index, update, profile } = userController;

userRoutes.post("/", create);
userRoutes.get("/", auth, isAdmin, index);
userRoutes.get("/:id", auth, show);
userRoutes.get("/me", auth, profile);
userRoutes.put("/", auth, update);
userRoutes.delete("/", auth, destroy);

export default userRoutes;
