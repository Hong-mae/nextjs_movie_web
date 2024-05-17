import { getMovieDetails } from "@/lib/tmdbController";
import { Box } from "@chakra-ui/react";
import React from "react";

interface PathProps {
  params: any;
}

export const getServerSideProps = async ({ params }: PathProps) => {
  const { movie_id } = params;
  const { props } = await getMovieDetails(movie_id);

  return {
    props,
  };
};

interface Props {
  details: any;
}

export const MovieDetail = ({ details }: Props) => {
  return (
    <Box as={"main"} mx={"auto"} maxW={"8xl"} px={4}>
      <Box as={"main"}>MovieDetail</Box>
    </Box>
  );
};

export default MovieDetail;
