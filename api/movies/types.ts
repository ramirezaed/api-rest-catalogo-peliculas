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

export interface IFilterMovie {
  title?: string;
  director?: string;
  genres?: string;
}
