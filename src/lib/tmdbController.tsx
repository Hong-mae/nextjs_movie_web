import axios from "axios";

const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMBD_MOIVE_BASE_URL;
const Authorization = "Bearer " + process.env.TMDB_ACCESS_TOKEN;

export const getMoiveList = async (target: string) => {
  const url = `${TMDB_BASE_URL}/${target}`;
  const getList = await axios.get(url, {
    params: {
      language: "ko-KR",
      region: "kr",
    },
    headers: {
      Authorization,
    },
  });

  return {
    props: {
      list: getList.data,
    },
  };
};
