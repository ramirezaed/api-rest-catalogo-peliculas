import express from "express";
import userController from "./controller";
import { auth } from "../../middleware/auth";
import { isAdmin } from "../../middleware/isAdmin";

const userRoutes = express.Router();

const { create, show, destroy, index, update, profile } = userController;

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Registrar un usuario
 *     description: Crea un nuevo usuario en el sistema.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - lastname
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Alejandro
 *               lastname:
 *                 type: string
 *                 example: Ramirez
 *               email:
 *                 type: string
 *                 format: email
 *                 example: alejandro@gmail.com
 *               password:
 *                 type: string
 *                 minLength: 8
 *                 example: "12345678"
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente.
 *       400:
 *         description: Datos obligatorios faltantes o contraseña menor a 8 caracteres.
 *       409:
 *         description: El email ya está registrado.
 *       500:
 *         description: Error interno del servidor.
 */
userRoutes.post("/", create);

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Listar usuarios
 *     description: Obtiene el listado de usuarios con paginación. Solo los administradores pueden acceder.
 *     tags: [Users]
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
 *         description: Cantidad de usuarios por página.
 *     responses:
 *       200:
 *         description: Usuarios obtenidos correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Información del usuario.
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
 *       403:
 *         description: No tenés permisos de administrador.
 *       500:
 *         description: Error interno del servidor.
 */
userRoutes.get("/", auth, isAdmin, index);

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Obtener mi perfil
 *     description: Obtiene los datos del usuario autenticado.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil obtenido correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Información del usuario autenticado.
 *       401:
 *         description: No autenticado o token inválido.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
userRoutes.get("/me", auth, profile);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     description: Obtiene los datos de un usuario específico por su ID. Requiere autenticación.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario.
 *         example: 672a1b2c3d4e5f6789012345
 *     responses:
 *       200:
 *         description: Usuario encontrado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               description: Información del usuario.
 *       401:
 *         description: No autenticado o token inválido.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
userRoutes.get("/:id", auth, show);

/**
 * @swagger
 * /users:
 *   put:
 *     summary: Actualizar mi perfil
 *     description: Actualiza los datos del usuario autenticado.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Alejandro
 *               lastname:
 *                 type: string
 *                 example: Ramirez
 *               email:
 *                 type: string
 *                 format: email
 *                 example: alejandro@gmail.com
 *     responses:
 *       200:
 *         description: Perfil actualizado correctamente.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: No autenticado o token inválido.
 *       404:
 *         description: Usuario no encontrado.
 *       409:
 *         description: El email ya está registrado.
 *       500:
 *         description: Error interno del servidor.
 */
userRoutes.put("/", auth, update);

/**
 * @swagger
 * /users:
 *   delete:
 *     summary: Eliminar mi cuenta
 *     description: Elimina la cuenta del usuario autenticado.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Cuenta eliminada correctamente.
 *       401:
 *         description: No autenticado o token inválido.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
userRoutes.delete("/", auth, destroy);

export default userRoutes;
