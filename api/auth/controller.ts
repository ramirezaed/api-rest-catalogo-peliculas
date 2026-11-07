import { NextFunction, Request, Response } from "express";
import authService from "./service";

const authController = {
  async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .status(200)
        .json(
          await authService.changePassword(
            req.user!.id,
            req.body.currentPassword,
            req.body.password,
          ),
        );
    } catch (error) {
      next(error);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      res
        .status(200)
        .json(await authService.login(req.body.email, req.body.password));
    } catch (error) {
      next(error);
    }
  },
};

export default authController;
