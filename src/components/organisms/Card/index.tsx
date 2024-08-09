import React from "react";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  HStack,
  Heading,
  Image,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMBD_IMAGE_BASE_URL;

interface CardProps {
  poster_path?: string;
  title?: string;
  overview?: string;
  vote_average: number;
  release_date: string;
  id: number;
}

export const BaseCard = ({
  poster_path = "/no_image.png",
  title = "No Title",
  overview = "No Overview",
  vote_average,
  release_date,
  id,
}: CardProps) => {
  let imgUrl = poster_path ?? `/no_image.png`;
  imgUrl =
    imgUrl.indexOf("no_image.png") !== -1
      ? imgUrl
      : `${TMDB_IMAGE_URL}/w400${poster_path}`;

  return (
    <Card maxW="md">
      <CardBody>
        <Flex
          flexDirection={"column"}
          justifyContent={"space-between"}
          height={"100%"}
        >
          <Flex flex={3} alignItems={"flex-start"} justifyContent={"center"}>
            <Image src={imgUrl} alt={title} borderRadius="lg" h={"100%"} />
          </Flex>
          <Stack flex={1} mt={4}>
            <Heading
              size="md"
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {title}
            </Heading>
            <Text
              style={{
                whiteSpace: "normal",
                display: "-webkit-box",
                WebkitLineClamp: 3,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
              }}
              minH={"72px"}
            >
              {overview ? overview : "등록된 정보가 없습니다."}
            </Text>
            <Flex
              alignItems={"center"}
              justifyContent={"end"}
              color={"gray.400"}
            >
              <Text>{release_date}</Text>
            </Flex>
          </Stack>
        </Flex>
      </CardBody>
      <Divider color={useColorModeValue("teal.600", "white")} />
      <CardFooter alignItems={"center"} justifyContent={"space-between"}>
        <HStack gap={0}>
          <StarIcon />
          <HStack gap={0} alignItems={"baseline"}>
            <Text fontSize={16}>{`${vote_average.toFixed(1)}`}</Text>
            <Text fontSize={10}>/10</Text>
          </HStack>
        </HStack>
        <HStack>
          <Button
            as={"a"}
            href={`/movies/details/${id}`}
            variant="link"
            colorScheme="blue"
          >
            자세히 보기..
          </Button>
        </HStack>
      </CardFooter>
    </Card>
  );
};
