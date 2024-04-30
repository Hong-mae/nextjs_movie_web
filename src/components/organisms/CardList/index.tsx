import { BaseCard } from "@/components/organisms/Card";
import { SimpleGrid } from "@chakra-ui/react";
import React from "react";

interface Props {
  movies: Array<MovieProps>;
}

interface MovieProps {
  adult: boolean;
  id: number;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const CardList = ({ movies }: Props) => {
  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      {movies.map((movie: MovieProps) => (
        <BaseCard key={movie.id} {...movie} />
      ))}
    </SimpleGrid>
  );
};
