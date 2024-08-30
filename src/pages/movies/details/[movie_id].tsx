import { getMovieInfo } from "@/lib/tmdbController";
import { Box, Image } from "@chakra-ui/react";
import React from "react";

const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMBD_IMAGE_BASE_URL;

interface PathProps {
  params: any;
}

export const getServerSideProps = async ({ params }: PathProps) => {
  const { movie_id } = params;
  const { props } = await getMovieInfo(movie_id, ["videos"]);

  return {
    props,
  };
};

interface Props {
  adult: any;
  videos: any;
  vote_average: any;
  status: any;
  title: any;
  tagline: any;
  overview: any;
  genres: any;
  belongs_to_collections: any;
  production_companies: any;
  poster_path: any;
  backdrop_path: any;
}

export const MovieDetail = (props: Props) => {
  const {
    adult,
    videos,
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
  } = props;

  const posterImg = `${TMDB_IMAGE_URL}/w400${poster_path}`;
  const backImg = `${TMDB_IMAGE_URL}/original${backdrop_path}`;

  return (
    <Box as={"main"} mx={"auto"} maxW={"8xl"} px={4}>
      <Image src={backImg} alt={title} borderRadius="lg" />
    </Box>
  );
};

export default MovieDetail;
