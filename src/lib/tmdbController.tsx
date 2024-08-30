import axios from "axios";

const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMBD_MOIVE_BASE_URL;
const Authorization = "Bearer " + process.env.TMDB_ACCESS_TOKEN;
const default_params = {
  language: "ko-KR",
  region: "kr",
};

export const getMoiveList = async (target: string) => {
  const url = `${TMDB_BASE_URL}/${target}`;
  const getList = await axios.get(url, {
    params: {
      ...default_params,
    },
    headers: {
      Authorization,
    },
  });

  return {
    list: getList.data,
  };
};

export const getMovieInfo = async (
  movie_id: number,
  target: Array<String>,
  kr: boolean = true,
) => {
  const append_to_response = target.join(",");

  const params = kr
    ? {
        ...default_params,
        append_to_response,
      }
    : {
        append_to_response,
      };

  const url = `${TMDB_BASE_URL}/${movie_id}`;
  const getInfo = await axios.get(url, {
    params,
    headers: {
      Authorization,
    },
  });

  return {
    info: getInfo.data,
  };
};

export const getVideos = async (movie_id: number) => {
  const url = `${TMDB_BASE_URL}/${movie_id}/videos`;
  const videos = await axios.get(url, {
    params: {
      ...default_params,
    },
    headers: {
      Authorization,
    },
  });

  return {
    props: {
      ...videos.data,
    },
  };
};

export const getImages = async (movie_id: number) => {
  const url = `${TMDB_BASE_URL}/${movie_id}/images`;
  const images = await axios.get(url, {
    headers: {
      Authorization,
    },
  });

  return {
    props: {
      ...images.data,
    },
  };
};
