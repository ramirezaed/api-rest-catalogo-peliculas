import express from "express";
import movieController from "./controller";
import { auth } from "../../middleware/auth";
import { isAdmin } from "../../middleware/isAdmin";

const movieRoutes = express.Router();
const { create, show, destroy, index, update, qualify } = movieController;

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Crear una película
 *     description: Registra una nueva película.
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - director
 *               - qualification
 *               - genres
 *             properties:
 *               title:
 *                 type: string
 *                 example: Inception
 *               director:
 *                 type: string
 *                 example: Christopher Nolan
 *               qualification:
 *                 type: number
 *                 example: 8.8
 *               genres:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Ciencia ficción", "Acción", "Suspenso"]
 *     responses:
 *       201:
 *         description: Película creada correctamente.
 *       400:
 *         description: Datos obligatorios faltantes o inválidos.
 *       500:
 *         description: Error interno del servidor.
 */
movieRoutes.post("/", auth, isAdmin, create);

movieRoutes.get("/", auth, index);

movieRoutes.get("/:id", auth, show);

movieRoutes.delete("/:id", auth, isAdmin, destroy);

movieRoutes.put("/:id", auth, isAdmin, update);

movieRoutes.put("/:id/qualify", auth, qualify);
export default movieRoutes;
