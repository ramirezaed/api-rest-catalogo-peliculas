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
 *     summary: Registrar una película
 *     description: Registra una nueva película. Solo los administradores pueden realizar esta operación.
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
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
 *                 example:
 *                   - Ciencia ficción
 *                   - Acción
 *                   - Suspenso
 *     responses:
 *       201:
 *         description: Película registrada correctamente.
 *       400:
 *         description: Datos obligatorios faltantes o inválidos.
 *       401:
 *         description: No autenticado o token inválido.
 *       403:
 *         description: No tenés permisos de administrador.
 *       500:
 *         description: Error interno del servidor.
 */
movieRoutes.post("/", auth, isAdmin, create);

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Listar y buscar películas
 *     description: Obtiene películas con paginación y filtros opcionales por género, título y director.
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *           minimum: 1
 *         description: Número de página.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *           minimum: 1
 *         description: Cantidad de películas por página.
 *       - in: query
 *         name: genres
 *         schema:
 *           type: string
 *         description: Filtrar por género.
 *         example: Acción
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Buscar por título (coincidencia parcial, sin distinguir mayúsculas).
 *         example: inception
 *       - in: query
 *         name: director
 *         schema:
 *           type: string
 *         description: Buscar por director (coincidencia parcial, sin distinguir mayúsculas).
 *         example: nolan
 *     responses:
 *       200:
 *         description: Películas obtenidas correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 movies:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Información de la película.
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: integer
 *                       example: 25
 *                     page:
 *                       type: integer
 *                       example: 1
 *                     limit:
 *                       type: integer
 *                       example: 10
 *                     totalPages:
 *                       type: integer
 *                       example: 3
 *       401:
 *         description: No autenticado o token inválido.
 *       500:
 *         description: Error interno del servidor.
 */
movieRoutes.get("/", auth, index);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Obtener una película por ID
 *     description: Obtiene los detalles de una película específica.
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la película.
 *         example: 672a1b2c3d4e5f6789012345
 *     responses:
 *       200:
 *         description: Película encontrada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 movie:
 *                   type: object
 *                   description: Información de la película.
 *       401:
 *         description: No autenticado o token inválido.
 *       404:
 *         description: Película no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
movieRoutes.get("/:id", auth, show);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Eliminar una película
 *     description: Elimina una película por su ID. Solo los administradores pueden realizar esta operación.
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la película que se desea eliminar.
 *         example: 672a1b2c3d4e5f6789012345
 *     responses:
 *       200:
 *         description: Película eliminada correctamente.
 *       401:
 *         description: No autenticado o token inválido.
 *       403:
 *         description: No tenés permisos de administrador.
 *       404:
 *         description: Película no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
movieRoutes.delete("/:id", auth, isAdmin, destroy);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Actualizar una película
 *     description: Actualiza los datos de una película por su ID. Solo los administradores pueden realizar esta operación.
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la película que se desea actualizar.
 *         example: 672a1b2c3d4e5f6789012345
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
 *               - generes
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
 *               generes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - Ciencia ficción
 *                   - Acción
 *                   - Suspenso
 *     responses:
 *       200:
 *         description: Película actualizada correctamente.
 *       400:
 *         description: Datos inválidos o incompletos.
 *       401:
 *         description: No autenticado o token inválido.
 *       403:
 *         description: No tenés permisos de administrador.
 *       404:
 *         description: Película no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
movieRoutes.put("/:id", auth, isAdmin, update);

/**
 * @swagger
 * /movies/{id}/qualify:
 *   put:
 *     summary: Calificar una película
 *     description: Registra una nueva calificación y actualiza el promedio de la película. Requiere autenticación.
 *     tags: [Movies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la película que se desea calificar.
 *         example: 672a1b2c3d4e5f6789012345
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - qualification
 *             properties:
 *               qualification:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 10
 *                 example: 9
 *     responses:
 *       200:
 *         description: Calificación registrada correctamente.
 *       400:
 *         description: La puntuación debe estar entre 1 y 10.
 *       401:
 *         description: No autenticado o token inválido.
 *       404:
 *         description: Película no encontrada.
 *       500:
 *         description: Error interno del servidor.
 */
movieRoutes.put("/:id/qualify", auth, qualify);
export default movieRoutes;
