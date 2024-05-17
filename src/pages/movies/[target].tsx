import { Box } from "@chakra-ui/react";
import { CardList } from "@/components/organisms/CardList";
import { getMoiveList } from "@/lib/tmdbController";

interface PathProps {
  params: any;
}

export const getStaticProps = async ({ params }: PathProps) => {
  const { props } = await getMoiveList(params.target);
  return {
    props,
  };
};

export const getStaticPaths = async () => {
  const paths = ["popular", "now_playing", "top_rated", "upcoming"].map(
    (target) => ({
      params: { target },
    }),
  );

  return {
    paths,
    fallback: false,
  };
};

interface Props {
  list: any;
}

const MovieListPage = ({ list }: Props) => {
  const movies = list.results;
  return (
    <Box as={"main"} mx={"auto"} maxW={"8xl"} px={4}>
      <CardList movies={movies} />{" "}
    </Box>
  );
};

export default MovieListPage;
