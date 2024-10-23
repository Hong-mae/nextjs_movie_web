import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Toolbar,
  Typography,
  Link,
} from "@mui/material";

import {
  getImageUrl,
  getMovieInfo,
  getMovieList,
} from "@/utils/tmdbController";
import { Info } from "@mui/icons-material";
import MovieCarousel from "@/components/organisms/MovieCarousel";

export const getStaticProps = async () => {
  const { list: now_playing } = await getMovieList("now_playing");
  const { list: popular } = await getMovieList("popular");
  const { list: top_rated } = await getMovieList("top_rated");
  const { list: upcoming } = await getMovieList("upcoming");

  const { info } = await getMovieInfo(now_playing.results[0].id, ["videos"]);

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
      <Box sx={{ position: "relative", height: "50vw" }}>
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

        <Container
          maxWidth="xl"
          sx={{
            color: "white",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
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
        title="평점 높은 영화"
        href="top_rated"
        lists={top_rated}
      />

      {/* 개봉 예정 영화 */}
      <MovieCarousel
        title="최신 or 개봉 예정 영화"
        href="upcoming"
        lists={upcoming}
      />
    </Box>
  );
};

export default Home;
