import { getMovieDetails } from "@/lib/tmdbController";
import { Box, Image } from "@chakra-ui/react";
import React from "react";

const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMBD_IMAGE_BASE_URL;

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
  const {
    adult,
    video,
    vote_average,
    status,
    title,
    tagline,
    overview,
    genres,
    belongs_to_collections,
    production_companies,
    poster_path,
    backdrop_path,
  } = details;

  const posterImg = `${TMDB_IMAGE_URL}/w400${poster_path}`;
  const backImg = `${TMDB_IMAGE_URL}/original${backdrop_path}`;

  return (
    <Box as={"main"} mx={"auto"} maxW={"8xl"} px={4}>
      <Image src={backImg} alt={title} borderRadius="lg" />
    </Box>
  );
};

export default MovieDetail;
