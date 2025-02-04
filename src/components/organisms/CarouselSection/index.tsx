import Carousel from "@/components/molecules/Carousel";
import { Box, Typography } from "@mui/material";
import React from "react";

interface Props {
  list: ReadonlyArray<MovieInfoProps>;
  title: string;
}

const CarouselSection = ({ list, title }: Props) => {
  return (
    <Box sx={{ my: 1 }}>
      <Typography variant="h5">
        {title}
        <Typography
          variant="caption"
          sx={{ display: "none", fontSize: "1rem" }}
        >
          {" more>"}
        </Typography>
      </Typography>
      <Carousel list={list} slidesToScroll={4} slidesToShow={4} />
    </Box>
  );
};

export default CarouselSection;
