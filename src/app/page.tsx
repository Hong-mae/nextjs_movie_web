import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { getMovieInfo, getMovieList } from "@/utils/tmdbController";
import { convertImageURL } from "@/utils/urlController";
import { Box, Button } from "@mui/material";
import { Info } from "@mui/icons-material";
import CarouselSection from "@/components/organisms/CarouselSection";
import { Metadata } from "next";
import { AlertDialog } from "@/components/molecules/Dialog";

export const metadata: Metadata = {
  title: "Watch Movie",
  description: "TMDB API를 이용한 영화 웹사이트 프로젝트",
};

const getList = async () => {
  const { results: now_playing } = await getMovieList("now_playing");
  const { results: popular } = await getMovieList("popular");
  const { results: top_rated } = await getMovieList("top_rated");
  const { results: upcoming } = await getMovieList("upcoming");

  const main = await getMovieInfo(now_playing[0].id);

  return {
    now_playing,
    popular,
    top_rated,
    upcoming,
    main,
  };
};

export default async function Home() {
  const { now_playing, popular, top_rated, upcoming, main } = await getList();
  const mainImgURL = convertImageURL(main.backdrop_path, "original");

  return (
    <>
      <Box sx={{ position: "relative", height: "50rem" }}>
        <Box
          component={"img"}
          src={mainImgURL}
          alt={main.title}
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
                  {main.title}
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
                  {main.overview}
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
                    평점: {Math.floor(main.vote_average * 10)}/100
                  </Button>
                  <Button
                    key="detail"
                    sx={{
                      color: "white",
                      bgcolor: "rgba(255,255,255,0.2)",
                    }}
                    href={`/movie/details/${main.id}`}
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
      <Container maxWidth="xl">
        {/* 상영 중인 영화 */}
        <CarouselSection title="상영 중인 영화" list={now_playing} />

        {/* 인기 상영작 */}
        <CarouselSection title="인기 상영작" list={popular} />

        {/* 최고 평점 영화 */}
        <CarouselSection title="최고 평점 영화" list={top_rated} />

        {/* 최근 개봉, 예정작 */}
        <CarouselSection title="최근 개봉, 예정작" list={upcoming} />
      </Container>
      <AlertDialog
        title="주의하세요. 정확하지 않은 API를 이용하고 있습니다."
        content="영화와 관련된 API는 TMDB API를 이용하고 있습니다. 이는 외국에서
          제공하는 API이며 제목, 줄거리, 설명, 개봉일 등 정보가 정확하지 않을 수 있습니다."
      />
    </>
  );
}
