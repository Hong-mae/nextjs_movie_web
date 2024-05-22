import React, { useState, useEffect, useRef, SetStateAction } from "react";
import {
  Box,
  Image,
  IconButton,
  position,
  Text,
  useColorModeValue,
  useBreakpointValue,
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
    arrows: false,
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
  };

  const top = useBreakpointValue({ base: "50%", md: "50%" });
  const side = useBreakpointValue({ base: "0%", md: "10px" });

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
          {list.results.map((movie: any, index: number) => {
            const imgUrl = `${TMDB_IMAGE_URL}/w200${movie.poster_path}`;
            const backImgUrl = `${TMDB_IMAGE_URL}/w300${movie.backdrop_path}`;
            return (
              <Box key={index}>
                <Box
                  height={"2xl"}
                  backgroundPosition="center"
                  backgroundRepeat="no-repeat"
                  backgroundSize="cover"
                  backgroundImage={`url(${backImgUrl})`}
                  filter="blur(2px)"
                />
                <Box position="absolute" backgroundColor="rgba(0, 0, 0, 0.4)">
                  {movie.title}
                </Box>
              </Box>
            );
          })}
        </Slider>
      </Box>
      <Box position={"relative"}>
        <IconButton
          aria-label="left-arrow"
          variant="ghost"
          position="absolute"
          left={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => nav2?.slickPrev()}
          bgColor={useColorModeValue("teal.600", "rgba(174, 174, 174, 0.5)")}
          color="white"
          _hover={{
            bgColor: useColorModeValue("teal.400", "white"),
          }}
        >
          <ChevronLeftIcon boxSize={8} />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          variant="ghost"
          position="absolute"
          right={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => nav2?.slickNext()}
          bgColor={useColorModeValue("teal.600", "rgba(174, 174, 174, 0.5)")}
          color="white"
          _hover={{
            bgColor: useColorModeValue("teal.400", "white"),
            color: useColorModeValue("white", "black"),
          }}
        >
          <ChevronRightIcon boxSize={8} />
        </IconButton>
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
    </Box>
  );
};

export default index;
