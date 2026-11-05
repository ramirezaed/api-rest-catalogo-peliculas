import { HttpError } from "../../errors/HttpError";
import movieDao from "./dao";
import { IRegisterMovieDao, IUpdateMovieDao } from "./types";

const movieService = {
  async create(data: IRegisterMovieDao) {
    if (!data || Object.keys(data).length === 0)
      throw new HttpError(400, "Todos los campos son obligatorios");
    return movieDao.craate(data);
  },
  async findById(id: string) {
    const movie = await movieDao.findById(id);
    if (!movie) throw new HttpError(404, "Pelicula no encontrada");
    return movie;
  },

  async index(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [movies, total] = await Promise.all([
      //Ejecuta las dos consultas en paralelo
      movieDao.index(skip, limit),
      movieDao.count(),
    ]);
    return {
      movies,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit), //redondea hacia arriba
      },
    };
  },

  async softDelete(id: string) {
    const movie = await movieDao.findById(id);
    if (!movie) throw new HttpError(404, "Pelicula no encotnrada");
    await movieDao.softDelete(id);
    return { message: "Pelicula eliminada" };
  },

  async update(id: string, data: IUpdateMovieDao) {
    const movie = await movieService.findById(id);
    if (!movie) throw new HttpError(404, "Pelicula no encontrada");
    return await movieDao.update(id, data);
  },
};

export default movieService;
