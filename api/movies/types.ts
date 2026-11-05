export interface IRegisterMovieDao {
  title: string;
  director: string;
  qualification: number;
  genres: string[];
}

export interface IUpdateMovieDao {
  title: string;
  director: string;
  qualification: number;
  generes: string[];
}
