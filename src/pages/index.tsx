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
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

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

const imgConvert = (imgUrl: string, size: number | string) => {
  if (imgUrl === null || imgUrl === undefined) {
    return "/no_image.png";
  }

  return `${TMDB_IMAGE_URL}/${typeof size === "number" ? `w${size}` : `${size}`}${imgUrl}`;
};

const index = ({ list }: Props) => {
  const [nav1, setNav1] = useState<Slider | null>();
  const [nav2, setNav2] = useState<Slider | null>();

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
    arrows: false,
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
      <Box borderRadius={8} overflow={"hidden"}>
        <Slider
          asNavFor={nav2}
          ref={(slider) => setNav1(slider)}
          arrows={false}
          fade={true}
          className="section"
        >
          {list.results.map((movie: any) => {
            const imgUrl = imgConvert(movie.poster_path, 342);
            const backImgUrl = imgConvert(movie.backdrop_path, "original");
            return (
              <Box
                key={movie.title}
                position={"relative"}
                display={"block !important"}
              >
                <Box>
                  <Image src={`${backImgUrl}`} />
                </Box>
                <Box
                  borderRadius="md"
                  p={4}
                  display={"flex"}
                  position={"absolute"}
                  top={"50%"}
                  left={16}
                  right={16}
                  bgColor={useColorModeValue(
                    "rgba(255, 255, 255, 0.5)",
                    "rgba(0, 0, 0, 0.5)",
                  )}
                  transform={"translate(0, -50%)"}
                >
                  <Box>
                    <Image src={imgUrl} borderRadius="md" objectFit={"cover"} />
                  </Box>
                  <Box>
                    <Text>{movie.title}</Text>
                  </Box>
                </Box>
                {/* </Box> */}
              </Box>
            );
          })}
        </Slider>
      </Box>

      <Box position={"relative"}>
        {/* Left Icon */}
        <IconButton
          aria-label="left-arrow"
          position="absolute"
          left={"0"}
          top={"50%"}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => nav2?.slickPrev()}
          h={"100%"}
          px={4}
          bg={useColorModeValue(
            "linear-gradient(90deg, rgba(255, 255, 255, 0.8) 0%, rgba(0,0,0,0) 100%);",
            "linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(255,255,255,0) 100%);",
          )}
        >
          <BiLeftArrowAlt size="40px" />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          position="absolute"
          right={"0"}
          top={"50%"}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => nav2?.slickNext()}
          h={"100%"}
          px={4}
          // bg={
          //   "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%);"
          // }
          bg={useColorModeValue(
            "linear-gradient(90deg, rgba(0,0,0,0.0) 0%, rgba(255,255,255,0.8) 100%);",
            "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(0,0,0,0.5) 100%);",
          )}
        >
          <BiRightArrowAlt size="40px" />
        </IconButton>

        <Slider
          asNavFor={nav1}
          ref={(slider) => {
            setNav2(slider);
          }}
          {...settings}
        >
          {list.results.map((movie: any) => {
            const backImgUrl = imgConvert(movie.backdrop_path, 300);
            return (
              <Box key={movie.title} p={4}>
                <Image src={backImgUrl} borderRadius="lg" objectFit={"cover"} />
              </Box>
            );
          })}
        </Slider>
      </Box>
    </Box>
  );
};

export default index;
