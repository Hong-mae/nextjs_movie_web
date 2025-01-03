import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Toolbar,
  Typography,
  Link,
  CssBaseline,
} from "@mui/material";

import {
  getImageUrl,
  getMovieInfo,
  getMovieList,
} from "@/utils/tmdbController";
import { Info } from "@mui/icons-material";
import MovieCarousel from "@/components/organisms/MovieCarousel";
import Layout from "@/components/Layout";
import Head from "next/head";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import AlertDialog from "@/components/organisms/Dialog";

export const getStaticProps = async () => {
  const { results: now_playing } = await getMovieList("now_playing");
  const { results: popular } = await getMovieList("popular");
  const { results: top_rated } = await getMovieList("top_rated");
  const { results: upcoming } = await getMovieList("upcoming");

  const { info } = await getMovieInfo(now_playing[0].id, ["videos"]);

  // now_playing.results = now_playing.results.filter((_: any, i: any) => i != 0);

  return {
    props: {
      now_playing,
      popular,
      top_rated,
      upcoming,
      info,
    },
  };
};

interface Props {
  now_playing: any;
  popular: any;
  top_rated: any;
  upcoming: any;
  info: any;
}

const Home = ({ now_playing, popular, top_rated, upcoming, info }: Props) => {
  const mainImgUrl = getImageUrl(info.backdrop_path, "original");

  return (
    <Box>
      <Box sx={{ position: "relative", height: "50rem" }}>
        <img
          src={mainImgUrl}
          alt={info.title}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />

        <Box
          sx={{
            color: "white",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundImage:
              "linear-gradient(0deg, rgba(0,0,0,1), rgba(255,255,255, 0))",
          }}
        >
          <Container maxWidth="xl" sx={{}}>
            <Box
              sx={{
                maxWidth: "500px",
              }}
            >
              <Box>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  {info.title}
                </Typography>
                <Typography
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "4",
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {info.overview}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                  color: "white",
                  py: 2,
                }}
              >
                <Box
                  sx={{
                    justifyContent: "end",
                    textDecoration: "none",
                    color: "white",
                  }}
                >
                  <Button
                    disabled
                    key="rating"
                    sx={{
                      ":disabled": {
                        color: "inherit",
                        border: "none",
                      },
                    }}
                  >
                    평점: {Math.floor(info.vote_average * 10)}/100
                  </Button>
                  <Button
                    key="detail"
                    sx={{
                      color: "white",
                      bgcolor: "rgba(255,255,255,0.2)",
                    }}
                    href={`/movie/details/${info.id}`}
                  >
                    <Info sx={{ pr: 1 }} />
                    상세보기
                  </Button>
                </Box>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>

      {/* <CardList list={results} /> */}

      {/* 상영 중인 작품 */}
      <MovieCarousel
        title="상영중인 영화"
        href="now_playing"
        lists={now_playing}
      />

      {/* 인기 영화 */}
      <MovieCarousel title="인기 영화" href="popular" lists={popular} />

      {/* 평점 높은 작품 */}
      <MovieCarousel
        title="역대 평점 높은 영화"
        href="top_rated"
        lists={top_rated}
      />

      {/* 개봉 예정 영화 */}
      <MovieCarousel
        title="곧 개봉하는 영화"
        href="upcoming"
        lists={upcoming}
      />

      {/* Dialog */}
      <AlertDialog
        title="주의하세요. 정확하지 않은 API를 이용하고 있습니다."
        content="영화와 관련된 API는 TMDB API를 이용하고 있습니다. 이는 외국에서
          제공하는 API이며 제목, 줄거리, 설명, 개봉일 등 정보가 정확하지 않을 수 있습니다."
      />
    </Box>
  );
};

export default Home;
