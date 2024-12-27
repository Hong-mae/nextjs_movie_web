import { Box, Container, Link, Typography } from "@mui/material";
import React from "react";
import Carousel from "../Carousel";

interface Props {
  lists: any;
  title: string;
  href: string;
}

const MovieCarousel = ({ title, href, lists }: Props) => {
  return (
    <Container maxWidth="xl">
      <Box margin="1.5rem 0">
        <Link
          variant="h4"
          underline="none"
          color="inherit"
          href={`/movie/${href}`}
          sx={{
            display: "inline-block",
            transition: "1s ease-in-out",
            mb: "0.5rem",
            ":hover": {
              "& > * ": {
                display: "inline",
              },
            },
          }}
        >
          {title}
          <Typography
            variant="subtitle1"
            sx={{
              display: "none",
            }}
          >
            {` 더 보기 ＞`}
          </Typography>
        </Link>
        <Carousel items={lists.results} />
      </Box>
    </Container>
  );
};

export default MovieCarousel;
