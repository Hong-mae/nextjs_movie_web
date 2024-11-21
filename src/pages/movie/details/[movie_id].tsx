import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getMovieInfo, getMovieList } from "@/utils/tmdbController";
import { GetServerSidePropsContext } from "next";
import { AppBar, Divider, Toolbar } from "@mui/material";

interface Props extends MovieInfoProps {
  videos: ReadonlyArray<object>;
  backdrops: ReadonlyArray<object>;
  logos: ReadonlyArray<object>;
  posters: ReadonlyArray<object>;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const {
    params: { movie_id },
  } = context;

  const { info } = await getMovieInfo(movie_id, ["videos", "images"], false);

  const videos = info.videos.results.filter(
    (e, i) => e.site.toLowerCase() === "youtube"
  );

  const { backdrops, posters, logos } = info.images;

  return {
    props: {
      ...info,
      videos,
      backdrops,
      posters,
      logos,
    },
  };
};

const info = ({ id, overview, videos, logos }: Props) => {
  return (
    <>
      <Toolbar />
      <p>{id}</p>
      <p>{overview}</p>
      {videos.map((e) => (
        <>
          <p>{e.name}</p>
          <p>{e.key}</p>
          <Divider />
        </>
      ))}
      {logos.map((e) => (
        <>
          <p>{e.iso_639_1}</p>
          <p>{e.file_path}</p>
          <Divider />
        </>
      ))}
    </>
  );
};

export default info;
