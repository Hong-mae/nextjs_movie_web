import React, { ReactNode, SyntheticEvent, useEffect, useState } from "react";
import { getImageUrl, getMovieInfo } from "@/utils/tmdbController";
import { GetServerSidePropsContext } from "next";
import {
  Box,
  Container,
  Rating,
  Stack,
  styled,
  Toolbar,
  Typography,
  Chip,
} from "@mui/material";
import Error from "next/error";
import TmdbStatus from "../../../utils/data.json";
import Head from "next/head";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Tabs from "@/components/organisms/Tabs";

interface Props extends MovieInfoProps {
  videos: ReadonlyArray<object>;
  backdrops: ReadonlyArray<object>;
  logos: ReadonlyArray<object>;
  posters: ReadonlyArray<object>;
  cast: ReadonlyArray<object>;
  crew: ReadonlyArray<object>;
  errorCode?: number;
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { params }: any = context;

  if (isNaN(params.movie_id) || params.movie_id === null) {
    return {
      props: { errorCode: 400 },
    };
  }

  const { info } = await getMovieInfo(
    params.movie_id,
    ["videos", "images", "credits"],
    false
  );

  const videos = info.videos.results.filter(
    (e: any, i: number) => e.site.toLowerCase() === "youtube"
  );

  const { backdrops, posters, logos } = info.images;
  const { cast, crew } = info.credits;

  delete info.images;
  delete info.videos;
  delete info.credits;

  return {
    props: {
      ...info,
      videos,
      backdrops,
      posters,
      logos,
      crew,
      cast,
    },
  };
};

const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
  "& .MuiRating-iconEmpty": {
    color: "white",
  },
});

const info = ({
  title,
  release_date,
  tagline = " ",
  status,
  poster_path,
  backdrop_path,
  overview = "등록된 정보가 없습니다.",
  vote_average,
  genres,
  posters,
  backdrops,
  videos,
  errorCode,
}: Props) => {
  const mainPoster = getImageUrl(poster_path, 342);
  const backdrop = getImageUrl(backdrop_path, "original");

  const movieStatus: any = TmdbStatus.movie.status;

  const slideOpts = {
    dots: true,
    infinite: false,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    style: {
      width: "auto",
    },
  };

  if (errorCode) return <Error statusCode={errorCode} title="Invalid Value" />;
  return (
    <>
      <Head>
        <title>{`${title} | Watch Movie`}</title>
      </Head>
      <Toolbar />
      <Box
        sx={{
          backgroundImage: `url(${backdrop})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Box
          sx={{
            py: 2,
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "white",
          }}
        >
          <Container fixed>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <Box
                flex={1}
                sx={{
                  "& > img": {
                    display: "block",
                    width: {
                      xs: "100%",
                    },
                  },
                }}
              >
                <img src={mainPoster} />
              </Box>
              <Box flex={"2"}>
                <Stack
                  direction={"column"}
                  spacing={2}
                  height={"100%"}
                  sx={{
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <Box flex={2}>
                    <Typography variant="h2" fontWeight={"bold"}>
                      {title}
                    </Typography>
                    <Typography variant="subtitle1">{tagline}</Typography>
                  </Box>
                  <Box flex={8}>
                    <Typography variant="subtitle2">{overview}</Typography>
                  </Box>
                  <Box flex={1}>
                    <Stack direction={"row"} spacing={1}>
                      {genres.map((e: genresObj, i: number) => {
                        return (
                          <Chip
                            key={i}
                            label={`#${e.name}`}
                            variant="outlined"
                            sx={{
                              color: "white",
                            }}
                            clickable
                          />
                        );
                      })}
                    </Stack>
                  </Box>
                  <Box flex={1}>
                    <Typography variant="subtitle2">
                      {release_date} / {movieStatus[status]}
                    </Typography>
                    <StyledRating
                      name="size-large"
                      size="large"
                      precision={0.5}
                      value={Math.round(vote_average / 2)}
                      readOnly
                    />
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Container>
        </Box>
      </Box>
      <Tabs data={{ backdrops, posters, videos }} />
    </>
  );
};

export default info;
