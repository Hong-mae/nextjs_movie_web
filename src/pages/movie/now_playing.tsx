import CardList from "@/components/organisms/CardList";
import { getMovieList } from "@/utils/tmdbController";
import { AppBar, Box, CircularProgress, Toolbar } from "@mui/material";
import Head from "next/head";
import React, { useCallback, useEffect, useState } from "react";

export const getStaticProps = async () => {
  const { list: now_playing } = await getMovieList("now_playing");

  console.log(now_playing.page);

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
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(now_playing.page);

  const getMoreList = async () => {
    setIsLoading(true);
    const pageNumber = page + 1;
    const moreList: any = await getMovieList("now_playing", pageNumber);
    if (moreList.results) {
      setPage(pageNumber);
      setlist([...list, moreList.results]);
    }
    setIsLoading(false);
  };

  const detectScroll = () => {
    console.log(
      window.scrollY,
      document.body.offsetHeight,
      window.innerHeight,
      window.outerHeight,
      document.body.offsetHeight - window.innerHeight
    );
  };

  useEffect(() => {
    window.addEventListener("scroll", detectScroll);

    return () => {
      window.removeEventListener("scroll", detectScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>상영 중 | Watch Movie</title>
      </Head>
      <Box>
        <Toolbar />
        <CardList list={list} />
        {isLoading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 2,
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </>
  );
};

export default now_playing;
