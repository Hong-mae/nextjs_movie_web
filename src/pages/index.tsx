import React from "react";
import { Box, Flex, SimpleGrid, Container } from "@chakra-ui/react";
import axios from "axios";
import { BaseCard } from "@/components/organisms/Card";
import { CardList } from "@/components/organisms/CardList";

const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMBD_MOIVE_BASE_URL;
const Authorization = "Bearer " + process.env.TMDB_ACCESS_TOKEN;

export const getServerSideProps = async () => {
  const url = `${TMDB_BASE_URL}/popular`;
  const popularMovie = await axios.get(url, {
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
      popular: popularMovie.data,
    },
  };
};

interface Props {
  popular: any;
}

const index = ({ popular }: Props) => {
  const movies: any = popular.results;
  return (
    <Container mt={16} maxW={"container.xl"}>
      {/* <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(300px, 1fr))"
      >
        {movies.map((movie: any) => (
          <BaseCard key={movie.id} {...movie} />
        ))}
      </SimpleGrid> */}
      <CardList movies={movies} />
    </Container>
  );
};

export default index;
