import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  getImageUrl,
  getMovieInfo,
  getMovieList,
} from "@/utils/tmdbController";
import { GetServerSidePropsContext } from "next";
import {
  AppBar,
  Box,
  Container,
  Divider,
  Grid2 as Grid,
  Rating,
  Stack,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import Error from "next/error";

interface Props extends MovieInfoProps {
  videos: ReadonlyArray<object>;
  backdrops: ReadonlyArray<object>;
  logos: ReadonlyArray<object>;
  posters: ReadonlyArray<object>;
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
  overview,
  vote_average,
  errorCode,
}: Props) => {
  if (errorCode) return <Error statusCode={errorCode} title="Invalid Value" />;

  const mainPoster = getImageUrl(poster_path, 342);
  const backdrop = getImageUrl(backdrop_path, "original");

  return (
    <>
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
            py: 4,
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(0,0,0,0.5)",
            color: "white",
          }}
        >
          <Container fixed>
            <Grid container spacing={2}>
              <Grid size={4}>
                <img src={mainPoster} />
              </Grid>
              <Grid size={8}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "flex-start",
                    height: "100%",
                  }}
                >
                  <Box flex={3}>
                    <Typography variant="h2" fontWeight={"bold"}>
                      {title}
                    </Typography>
                    <Typography variant="overline">{tagline}</Typography>
                  </Box>
                  <Box flex={8}>
                    <Typography variant="subtitle1">{overview}</Typography>
                    <StyledRating
                      name="size-large"
                      size="large"
                      precision={0.5}
                      value={Math.round(vote_average / 2)}
                      readOnly
                    />
                  </Box>
                  <Box flex={1}>
                    <Typography variant="subtitle1">{overview}</Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
      {/* <Box>
        <img src={backDrop} />

        <img src={mainPoster} />
      </Box>
      {status}
      {release_date}
      {title}
      {tagline}
      <img src={backDrop} /> */}
    </>
  );
};

export default info;
