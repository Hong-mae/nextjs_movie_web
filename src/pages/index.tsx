import React, { useState, useEffect, useRef, SetStateAction } from "react";
import {
  Box,
  Image,
  IconButton,
  position,
  Text,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { getMoiveList, getMovieInfo } from "@/lib/tmdbController";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMBD_IMAGE_BASE_URL;

export const getServerSideProps = async () => {
  const { list } = await getMoiveList("now_playing");
  const { info } = await getMovieInfo(list.results[0].id, ["videos"]);

  return {
    props: {
      list,
      info,
    },
  };
};

interface Props {
  list: {
    results: ReadonlyArray<object>;
  };
  info: any;
}

const imgConvert = (imgUrl: string, size: number | string) => {
  if (imgUrl === null || imgUrl === undefined) {
    return "/no_image.png";
  }

  return `${TMDB_IMAGE_URL}/${typeof size === "number" ? `w${size}` : `${size}`}${imgUrl}`;
};

const index = ({ list, info }: Props) => {
  const bdImageUrl = imgConvert(info.backdrop_path, "original");

  return (
    <Box h={"100%"}>
      <Image src={bdImageUrl} />
    </Box>
  );
};

export default index;
