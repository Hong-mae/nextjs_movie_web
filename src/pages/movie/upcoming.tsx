import CardList from "@/components/organisms/CardList";
import { getMovieList } from "@/utils/tmdbController";
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
        <title>Upcoming | Watch Movie</title>
      </Head>
      <CardList list={upcoming.results} />
    </>
  );
};

export default upcoming;
