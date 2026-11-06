import express from "express";
import movieRoutes from "../api/movies/routes";

const routes = express.Router();
routes.use("/movies", movieRoutes);
export default routes;
