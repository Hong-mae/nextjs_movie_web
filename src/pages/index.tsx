import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";

import {
  getImageUrl,
  getMovieInfo,
  getMovieList,
} from "@/utils/tmdbController";
import CardList from "@/components/organisms/CardList";
import { Info } from "@mui/icons-material";

export const getServerSideProps = async () => {
  const { list } = await getMovieList("now_playing");
  const { info } = await getMovieInfo(list.results[0].id, ["videos"]);

  list.results = list.results.filter((_: any, i: any) => i != 0);

  return {
    props: {
      list,
      info,
    },
  };
};

interface Props {
  list: {
    results: ReadonlyArray<object>;
  };
  info: any;
}

const Home = ({ list: { results }, info }: Props) => {
  const mainImgUrl = getImageUrl(info.backdrop_path, "original");

  return (
    <Box>
      <Box height={"90vh"} position={"relative"}>
        <img
          src={mainImgUrl}
          alt={info.title}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
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
              padding: "1rem",
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

      <CardList list={results} />
    </Box>
  );
};

export default Home;
