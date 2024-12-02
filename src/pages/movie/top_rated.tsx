import CardList from "@/components/organisms/CardList";
import { getMovieList } from "@/utils/tmdbController";
import { Toolbar } from "@mui/material";
import Head from "next/head";
import React from "react";

export const getStaticProps = async () => {
  const { list: top_rated } = await getMovieList("top_rated");

  return {
    props: {
      top_rated,
    },
  };
};

interface Props {
  top_rated: any;
}

const top_rated = ({ top_rated }: Props) => {
  return (
    <>
      <Head>
        <title>최고 평점 | Watch Movie</title>
      </Head>
      <Toolbar />
      <CardList list={top_rated.results} />
    </>
  );
};

export default top_rated;
