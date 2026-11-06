import { FilterQuery } from "mongoose";
import { HttpError } from "../../errors/HttpError";
import movieDao from "./dao";
import { IFilterMovie, IRegisterMovieDao, IUpdateMovieDao } from "./types";
import { Movie } from "./model";

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

  async index(page: number, limit: number, filters: IFilterMovie) {
    const skip = (page - 1) * limit;

    const query: FilterQuery<typeof Movie> = {};

    if (filters.genres) {
      query.genres = filters.genres;
    }
    if (filters.title) {
      query.title = { $regex: filters.title, $options: "i" };
    }
    if (filters.director) {
      query.director = { $regex: filters.director, $options: "i" };
    }

    const [movies, total] = await Promise.all([
      movieDao.index(skip, limit, query),
      movieDao.count(query),
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

  async delete(id: string) {
    const movie = await movieDao.findById(id);
    if (!movie) throw new HttpError(404, "Pelicula no encotnrada");
    await movieDao.delete(id);
    return { message: "Pelicula eliminada" };
  },
  async update(id: string, data: IUpdateMovieDao) {
    const movie = await movieService.findById(id);
    if (!movie) throw new HttpError(404, "Pelicula no encontrada");
    return await movieDao.update(id, data);
  },

  async qualify(id: string, qualification: number) {
    const movie = await movieDao.findById(id);
    if (!movie) throw new HttpError(404, "pelicula no encontrada");

    if (qualification < 1 || qualification > 10)
      throw new HttpError(400, "La puntuacion debe estar entre 1 y 10");

    const average = (movie.qualification! + qualification) / 2;
    const newQualification = Number(average.toFixed(1));

    return await movieDao.qualify(id, newQualification);
  },
};

export default movieService;
