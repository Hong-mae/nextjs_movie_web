import CardList from "@/components/organisms/CardList";
import { getMovieList } from "@/utils/tmdbController";
import { AppBar, Box, Toolbar } from "@mui/material";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";

export const getStaticProps = async () => {
  const { list: now_playing } = await getMovieList("now_playing");

  return {
    props: {
      now_playing,
    },
  };
};

interface Props {
  now_playing: any;
}

const now_playing = ({ now_playing }: Props) => {
  const [list, setlist] = useState(now_playing.results);

  return (
    <>
      <Head>
        <title>상영 중 | Watch Movie</title>
      </Head>
      <Box>
        <Toolbar />
        <CardList list={list} />
      </Box>
    </>
  );
};

export default now_playing;
