import express from "express";
import movieRoutes from "../api/movies/routes";
import userRoutes from "../api/users/routes";
import authRoutes from "../api/auth/routes";

const routes = express.Router();
routes.use("/movies", movieRoutes);
routes.use("/users", userRoutes);
routes.use("/auth", authRoutes);
export default routes;
