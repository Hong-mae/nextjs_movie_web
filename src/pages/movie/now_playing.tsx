import CardList from "@/components/organisms/CardList";
import { getMovieList } from "@/utils/tmdbController";
import Head from "next/head";
import React from "react";

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
  return (
    <>
      <Head>
        <title>Now Playing | Watch Movie</title>
      </Head>
      <CardList list={now_playing.results} />
    </>
  );
};

export default now_playing;
