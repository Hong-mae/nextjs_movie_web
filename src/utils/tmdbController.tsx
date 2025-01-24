import { convertURL } from "./urlController";

const TMDB_MOVIE_URL = process.env.NEXT_PUBLIC_TMDB_MOVIE_URL;
const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;
const Authorization = "Bearer " + process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN;
const default_params = {
  language: "ko-KR",
};

export const getImageUrl = (target: string, size: number | string) => {
  if (target === null || target === undefined) {
    return "/no_image.png";
  }
  return `${TMDB_IMAGE_URL}/${
    typeof size === "number" ? `w${size}` : `${size}`
  }${target}`;
};

export const getMovieList = async (target: string, page: number = 1) => {
  const params = {
    ...default_params,
    page: page.toString(),
  };

  const data = await fetch(convertURL(`${TMDB_MOVIE_URL}/${target}`, params), {
    headers: {
      Authorization,
    },
  }).then((data) => data.json());

  return data;
};

export const getMovieInfo = async (
  movie_id: string | number | undefined,
  append: Array<string> = [],
  kr: boolean = true
) => {
  const append_to_response = append.join(",");
  const params = kr
    ? {
        ...default_params,
        append_to_response,
      }
    : {
        append_to_response,
        include_image_language: "ko",
        language: "ko-KR",
      };

  const data = await fetch(
    convertURL(`${TMDB_MOVIE_URL}/${movie_id}`, params),
    {
      headers: {
        Authorization,
      },
    }
  ).then((data) => data.json());

  return data;
};
