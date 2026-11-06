import { NextFunction, Request, Response } from "express";
import movieService from "./service";
import { IFilterMovie } from "./types";

const movieController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      res.status(201).json(await movieService.create(req.body));
    } catch (error) {
      next(error);
    }
  },

  async show(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      res.status(200).json(await movieService.findById(id));
    } catch (error) {
      next(error);
    }
  },

  async index(req: Request, res: Response, next: NextFunction) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 10;
      res
        .status(200)
        .json(await movieService.index(page, limit, req.query as IFilterMovie));
    } catch (error) {
      next(error);
    }
  },

  async destroy(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      res.status(200).json(await movieService.softDelete(id));
    } catch (error) {
      next(error);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      res.status(200).json(await movieService.update(id, req.body));
    } catch (error) {
      next(error);
    }
  },
};

export default movieController;
