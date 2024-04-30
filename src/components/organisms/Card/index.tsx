import React from "react";
import {
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
  const imgUrl =
    poster_path.indexOf("no_image.png") !== -1
      ? poster_path
      : `${TMDB_IMAGE_URL}/w400${poster_path}`;

  return (
    <Card maxW="md">
      <CardBody>
        <Flex
          alignItems={"flex-start"}
          justifyContent={"center"}
          minH={"300px"}
        >
          <Image
            src={imgUrl}
            alt="Green double couch with wooden legs"
            borderRadius="lg"
          />
        </Flex>
        <Stack mt="6" spacing="3">
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
        </Stack>
        <Flex alignItems={"center"} justifyContent={"end"} color={"gray.400"}>
          <Text>{release_date}</Text>
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
            href={`/movie/details/${id}`}
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
