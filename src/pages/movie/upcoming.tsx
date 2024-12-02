import CardList from "@/components/organisms/CardList";
import { getMovieList } from "@/utils/tmdbController";
import { Toolbar } from "@mui/material";
import Head from "next/head";
import React from "react";

export const getStaticProps = async () => {
  const { list: upcoming } = await getMovieList("upcoming");

  return {
    props: {
      upcoming,
    },
  };
};

interface Props {
  upcoming: any;
}

const upcoming = ({ upcoming }: Props) => {
  return (
    <>
      <Head>
        <title>개봉 임박 | Watch Movie</title>
      </Head>
      <Toolbar />
      <CardList list={upcoming.results} />
    </>
  );
};

export default upcoming;
