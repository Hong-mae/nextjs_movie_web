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
import Carousel from "@/components/organisms/Carousel";
import now_playing from "./movie/now_playing";

export const getServerSideProps = async () => {
  const { list: now_playing } = await getMovieList("now_playing");
  const { list: popular } = await getMovieList("popular");
  const { list: top_rated } = await getMovieList("top_rated");
  const { list: upcoming } = await getMovieList("upcoming");

  const { info } = await getMovieInfo(now_playing.results[0].id, ["videos"]);

  now_playing.results = now_playing.results.filter((_: any, i: any) => i != 0);

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
      <Box position={"relative"}>
        <img
          src={mainImgUrl}
          alt={info.title}
          loading="lazy"
          style={{ width: "100%", objectFit: "cover" }}
        />

        <Container
          maxWidth="xl"
          sx={{
            position: "absolute",
            color: "white",
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
                px: 2,
                py: 1,
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
      <Container maxWidth="xl">
        <Box margin="1.5rem 0">
          <Link
            variant="h4"
            underline="none"
            color="inherit"
            href="/movie/now_playing"
            sx={{
              display: "inline-block",
              mb: "0.5rem",
            }}
          >
            상영중인 영화
          </Link>
          <Carousel items={now_playing.results} />
        </Box>
      </Container>

      {/* 인기 영화 */}
      <Container maxWidth="xl">
        <Box margin="1.5rem 0">
          <Link
            variant="h4"
            underline="none"
            color="inherit"
            href="/movie/popular"
            sx={{
              display: "inline-block",
              mb: "0.5rem",
            }}
          >
            인기 영화
          </Link>
          <Carousel items={popular.results} />
        </Box>
      </Container>

      {/* 평점 높은 작품 */}
      <Container maxWidth="xl">
        <Box margin="1.5rem 0">
          <Link
            variant="h4"
            underline="none"
            color="inherit"
            href="/movie/top_rated"
            sx={{
              display: "inline-block",
              mb: "0.5rem",
            }}
          >
            평점 높은 영화
          </Link>
          <Carousel items={top_rated.results} />
        </Box>
      </Container>

      {/* 개봉 예정 영화 */}
      <Container maxWidth="xl">
        <Box margin="1.5rem 0">
          <Link
            variant="h4"
            underline="none"
            color="inherit"
            href="/movie/upcoming"
            sx={{
              display: "inline-block",
              mb: "0.5rem",
            }}
          >
            최근 개봉 or 예정 영화
          </Link>
          <Carousel items={upcoming.results} />
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
