import CardList from "@/components/organisms/CardList";
import { getMovieList } from "@/utils/tmdbController";
import Head from "next/head";
import React from "react";

export const getStaticProps = async () => {
  const { list: popular } = await getMovieList("popular");

  return {
    props: {
      popular,
    },
  };
};

interface Props {
  popular: any;
}

const popular = ({ popular }: Props) => {
  return (
    <>
      <Head>
        <title>Popular | Watch Movie</title>
      </Head>
      <CardList list={popular.results} />
    </>
  );
};

export default popular;
