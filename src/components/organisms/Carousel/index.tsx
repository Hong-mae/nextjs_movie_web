import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { getImageUrl } from "@/utils/tmdbController";
import { Box, Button, IconButton } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import { ComponentProps, HTMLAttributes, ReactElement, ReactNode } from "react";
import ImageCard from "../ImageCard";

interface Props {
  items: ReadonlyArray<MovieInfoProps>;
}

const NextArrow = (props: ComponentProps<"button">) => {
  const { onClick } = props;
  return (
    <Button
      aria-label="next"
      onClick={onClick}
      sx={{
        position: "absolute",
        color: "white",
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
        background:
          "linear-gradient(270deg, rgba(0,0,0,1) , rgba(255,255,255,0))",
      }}
    >
      <NavigateNext />
    </Button>
  );
};

const PrevArrow = (props: ComponentProps<"button">) => {
  const { className, style, onClick } = props;
  return (
    <Button
      aria-label="prev"
      onClick={onClick}
      sx={{
        position: "absolute",
        color: "white",
        left: 0,
        top: 0,
        bottom: 0,
        zIndex: 1000,
        background:
          "linear-gradient(270deg, rgba(255,255,255,0) , rgba(0,0,0,1))",
      }}
    >
      <NavigateBefore />
    </Button>
  );
};

const Carousel = ({ items }: Props) => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidestoScroll: 1,
        },
      },
    ],
  };

  return (
    <Box className="slider-container" sx={{ position: "relative" }}>
      <Slider {...settings}>
        {items.map((e, i) => {
          const imgUrl = getImageUrl(e.backdrop_path, 780);
          return <ImageCard key={i} imgUrl={imgUrl} title={e.title} />;
        })}
      </Slider>
    </Box>
  );
};

export default Carousel;
