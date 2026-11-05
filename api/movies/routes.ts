import express from "express";
import movieController from "./controller";

const movieRoutes = express.Router();
const { create, show, destroy, index, update } = movieController;

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
movieRoutes.post("/", create);

movieRoutes.get("/", index);

movieRoutes.get("/:id", show);

movieRoutes.delete("/:id", destroy);

movieRoutes.put("/:id", update);
export default movieRoutes;
