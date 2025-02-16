"use client";

import { NavigateNext, NavigateBefore } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import Slider from "react-slick";
import { ComponentProps } from "react";
import { convertImageURL } from "@/utils/urlController";
import { Card } from "../Card";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const NextArrow = ({ onClick }: ComponentProps<"button">) => {
  return (
    <Button
      aria-label="next-btn"
      onClick={onClick}
      sx={[
        {
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
          borderRadius: 0,
          background:
            "linear-gradient(90deg, rgba(0,0,0,0), rgba(255,255,255,0.5))",
          ":hover": {
            "& > svg": { transition: "all 0.3s;", transform: "scale(1.5)" },
          },
          color: "white",
        },
        (theme) =>
          theme.applyStyles("dark", {
            background:
              "linear-gradient(90deg, rgba(0,0,0,0), rgba(0,0,0,0.5))",
          }),
      ]}
    >
      <NavigateNext fontSize="large" />
    </Button>
  );
};

const PrevArrow = ({ onClick }: ComponentProps<"button">) => {
  return (
    <Button
      aria-label="prev-btn"
      onClick={onClick}
      sx={[
        {
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 1000,
          borderRadius: 0,
          background:
            "linear-gradient(270deg, rgba(0,0,0,0), rgba(255,255,255,0.5))",
          ":hover": {
            "& > svg": { transition: "all 0.3s;", transform: "scale(1.5)" },
          },
          color: "white",
        },
        (theme) =>
          theme.applyStyles("dark", {
            background:
              "linear-gradient(270deg, rgba(0,0,0,0), rgba(0,0,0,0.5))",
          }),
      ]}
    >
      <NavigateBefore fontSize="large" />
    </Button>
  );
};

interface CarouselProps {
  list: ReadonlyArray<MovieInfoProps>;
  slidesToShow?: number;
  slidesToScroll?: number;
}

export const Carousel = ({ list }: CarouselProps) => {
  const settings = {
    dots: false,
    infinite: false,
    initialSlide: 0,
    slidesToShow: 6,
    slidesToScroll: 6,
    draggable: false,
    lazyload: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Box
      className="slider-container"
      sx={{
        position: "relative",
        "& .slick-list": {
          "& .slick-slide > div": { padding: "0 5px" },
        },
      }}
    >
      <Slider {...settings}>
        {list.map((e) => {
          const imgUrl = convertImageURL(e.backdrop_path, 780);
          return <Card key={e.title} imgUrl={imgUrl} mId={e.id} {...e} />;
        })}
      </Slider>
    </Box>
  );
};
