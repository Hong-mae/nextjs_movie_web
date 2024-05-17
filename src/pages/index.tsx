import React, { useState, useEffect, useRef, SetStateAction } from "react";
import {
  Box,
  Image,
  IconButton,
  position,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { getMoiveList } from "@/lib/tmdbController";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMBD_IMAGE_BASE_URL;

export const getServerSideProps = async () => {
  const { props } = await getMoiveList("now_playing");
  return {
    props,
  };
};

interface Props {
  list: {
    results: ReadonlyArray<object>;
  };
}

const SimpleArrow = (props: any) => {
  const { type, className, style, onClick } = props;

  if (type === "left") {
    return (
      <IconButton
        aria-label="right_button"
        icon={
          <ChevronLeftIcon
            className={className}
            style={{ ...style }}
            onClick={onClick}
          />
        }
      />
    );
  } else {
    return (
      <IconButton
        aria-label="left_button"
        icon={
          <ChevronRightIcon
            className={className}
            style={{ ...style }}
            onClick={onClick}
          />
        }
      />
    );
  }
};

const index = ({ list }: Props) => {
  const [nav1, setNav1] = useState<Slider | null>();
  const [nav2, setNav2] = useState<Slider | null>();
  // let sliderRef1 = useRef<unknown>(null);
  // let sliderRef2 = useRef<Slider>(null);

  // useEffect(() => {
  //   setNav1(sliderRef1);
  //   setNav2(sliderRef2);
  // }, []);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    slidesToShow: 5,
    speed: 500,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    nextArrow: <SimpleArrow type="right" />,
    prevArrow: <SimpleArrow type="left" />,
  };

  return (
    <Box
      className="slider-container"
      as={"main"}
      mx={"auto"}
      maxW={"8xl"}
      px={4}
    >
      <Box borderRadius={16} overflow={"hidden"}>
        <Slider
          asNavFor={nav2}
          ref={(slider) => setNav1(slider)}
          arrows={false}
          fade={true}
          className="section"
        >
          {list.results.map((movie: any) => {
            const imgUrl = `${TMDB_IMAGE_URL}/w200${movie.poster_path}`;
            const backImgUrl = `${TMDB_IMAGE_URL}/w300${movie.backdrop_path}`;
            return (
              <Box key={movie.title}>
                <Box
                  w={"100%"}
                  h={"100%"}
                  position={"relative"}
                  p={16}
                  _before={{
                    content: "''",
                    backgroundImage: `url(${backImgUrl})`,
                    backgroundSize: "cover",
                    filter: "blur(10px)",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                >
                  <Box
                    width={"100%"}
                    height={"100%"}
                    borderRadius="md"
                    bgColor={useColorModeValue(
                      "rgba(255, 255, 255, 0.5)",
                      "rgba(0, 0, 0, 0.5)",
                    )}
                    position={"relative"}
                    p={4}
                    display={"flex"}
                  >
                    <Box>
                      <Image
                        src={imgUrl}
                        borderRadius="lg"
                        objectFit={"cover"}
                      />
                    </Box>
                    <Box>
                      <Text>{movie.title}</Text>
                    </Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Slider>
      </Box>
      <Slider
        asNavFor={nav1}
        ref={(slider) => {
          setNav2(slider);
        }}
        {...settings}
      >
        {list.results.map((movie: any) => {
          const imgUrl = `${TMDB_IMAGE_URL}/w300${movie.backdrop_path}`;
          return (
            <Box key={movie.title} p={4}>
              <Image src={imgUrl} borderRadius="lg" objectFit={"cover"} />
            </Box>
          );
        })}
      </Slider>
    </Box>
  );
};

export default index;
