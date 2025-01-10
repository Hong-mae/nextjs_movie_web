interface MovieListsProps {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: Array<MovieInfoProps>;
  total_pages: number;
  total_results: number;
}

interface MovieInfoProps {
  adult: boolean;
  backdrop_path: string;
  profile_path: string;
  genres: ReadonlyArray<genresObj>;
  genre_ids: ReadonlyArray<number>;
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  tagline: string;
  status: string;
}

type genresObj = {
  id: number;
  name: string;
};
