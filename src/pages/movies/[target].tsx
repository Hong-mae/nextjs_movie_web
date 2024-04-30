import { Container } from "@chakra-ui/react";
import { CardList } from "@/components/organisms/CardList";
import { getMoiveList } from "@/lib/tmdbController";

interface Props {
  params: any;
}

export const getStaticProps = async ({ params }: Props) => {
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

  console.log(paths);
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
    <Container mt={16} maxW={"container.xl"}>
      <CardList movies={movies} />
    </Container>
  );
};

export default MovieListPage;
