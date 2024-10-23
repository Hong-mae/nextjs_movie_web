import { Box, Container, Link } from "@mui/material";
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
            mb: "0.5rem",
          }}
        >
          {title}
        </Link>
        <Carousel items={lists.results} />
      </Box>
    </Container>
  );
};

export default MovieCarousel;
