import axios from "axios";

const TMDB_MOVIE_URL = process.env.TMDB_MOVIE_URL;
const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_URL;
const Authorization = "Bearer " + process.env.TMDB_ACCESS_TOKEN;
const default_params = {
  language: "ko-KR",
  region: "kr",
};

export const getImageUrl = (target: string, size: number | string) => {
  if (target === null || target === undefined) {
    return "/no_image.png";
  }
  return `${TMDB_IMAGE_URL}/${
    typeof size === "number" ? `w${size}` : `${size}`
  }${target}`;
};

export const getMovieList = async (target: string) => {
  const url = `${TMDB_MOVIE_URL}/${target}`;
  const list = await axios.get(url, {
    params: {
      ...default_params,
    },
    headers: {
      Authorization,
    },
  });

  return { list: list.data };
};

export const getMovieInfo = async (
  movie_id: string | number,
  target: Array<String>,
  kr: boolean = true
) => {
  const append_to_response = target.join(",");

  const params = kr
    ? {
        ...default_params,
        append_to_response,
      }
    : {
        append_to_response,
        include_image_language: "ko,en",
        language: "ko-KR",
      };

  const url = `${TMDB_MOVIE_URL}/${movie_id}`;

  const info = await axios.get(url, {
    params,
    headers: {
      Authorization,
    },
  });

  return { info: info.data };
};
