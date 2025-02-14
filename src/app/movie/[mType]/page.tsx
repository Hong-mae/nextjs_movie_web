import { getMovieList } from "@/utils/tmdbController";
import React from "react";
import { ResolvingMetadata, Metadata } from "next";
import TmdbStatus from "@/utils/data.json";
import { notFound } from "next/navigation";
import { convertImageURL } from "@/utils/urlController";

const MovieType = ["now_playing", "popular", "top_rated", "upcoming"];

type MetadataProps = {
  params: Promise<{ mType: string }>;
};

export const generateMetadata = async (
  { params }: MetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const mType = (await params).mType;
  const t: any = TmdbStatus.movie.type;

  return {
    title: `${t[mType]} | Watch Movie`,
    description: "영화 리스트 보기",
  };
};

export const generateStaticParams = () => {
  return MovieType.map((e) => ({
    mType: e,
  }));
};

interface MovieListProps {
  params: Promise<{ mType: string }>;
}

const getList = async (
  mType: string,
  page: number = 1
): Promise<MovieListsProps> => {
  const list = await getMovieList(mType, page).then((data: MovieListsProps) => {
    let results: Array<MovieInfoProps> = data.results;

    results.map((e) => {
      return {
        ...e,
        src: convertImageURL(e.poster_path, 185),
      };
    });

    return data;
  });

  return list;
};

const MovieList = async ({ params }: MovieListProps) => {
  const mType = (await params).mType;
  const {
    page, // Get Page Number
    results: list, // Movie list of page
  } = await getList(mType);

  if (MovieType.findIndex((e) => e === mType) === -1) {
    notFound();
  }

  return <div>{mType}</div>;
};

export default MovieList;
