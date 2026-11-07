import express from "express";
import authController from "./controller";
import { auth } from "../../middleware/auth";

const authRoutes = express.Router();

const { login, changePassword } = authController;

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Iniciar sesión
 *     description: Autentica un usuario y genera un token JWT válido durante 15 minutos.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: usuario@gmail.com
 *               password:
 *                 type: string
 *                 example: "12345678"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payload:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 672a1b2c3d4e5f6789012345
 *                     isAdmin:
 *                       type: boolean
 *                       example: false
 *                 accessToken:
 *                   type: string
 *                   description: Token JWT válido durante 15 minutos.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: Credenciales incorrectas.
 *       500:
 *         description: Error interno del servidor.
 */
authRoutes.post("/", login);

/**
 * @swagger
 * /auth:
 *   put:
 *     summary: Cambiar contraseña
 *     description: Permite al usuario autenticado cambiar su contraseña ingresando la contraseña actual y una nueva.
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: "12345678"
 *               newPassword:
 *                 type: string
 *                 minLength: 8
 *                 example: "abcdefgh123"
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contraseña actualizada
 *       400:
 *         description: Contraseña actual incorrecta o nueva contraseña menor a 8 caracteres.
 *       401:
 *         description: No autenticado o token inválido.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
authRoutes.put("/", auth, changePassword);

export default authRoutes;
