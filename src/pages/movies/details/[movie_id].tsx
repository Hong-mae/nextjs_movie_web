import React from "react";

interface Props {
  params: any;
}

export const getServerSideProps = async ({ params }: Props) => {
  const { movie_id } = params;

  console.log(params);

  return {
    props: { movie_id },
  };
};

export const MovieDetail = () => {
  return <div>MovieDetail</div>;
};

export default MovieDetail;
