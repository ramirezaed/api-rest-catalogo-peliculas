import { FilterQuery } from "mongoose";
import { Movie } from "./model";
import { IRegisterMovieDao, IUpdateMovieDao } from "./types";

const movieDao = {
  craate: (movie: IRegisterMovieDao) => Movie.create(movie),
  findById: (id: string) => Movie.findOne({ _id: id, deletedAt: null }),
  softDelete: (id: string) => Movie.findByIdAndDelete(id),

  update: (id: string, movie: Partial<IUpdateMovieDao>) =>
    Movie.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { $set: movie },
      { new: true },
    ),

  index: (skip: number, limit: number, query: FilterQuery<typeof Movie>) =>
    Movie.find({ ...query, deletedAt: null })
      .sort({ qualification: -1 })
      .skip(skip)
      .limit(limit),
  count: (query: FilterQuery<typeof Movie>) =>
    Movie.countDocuments({ ...query, deletedAt: null }),
};

export default movieDao;
