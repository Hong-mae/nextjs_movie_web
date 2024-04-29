import React from "react";
import {
  Box,
  Button,
  ButtonGroup,
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

const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMBD_IMAGE_BASE_URL;

interface CardProps {
  poster_path?: string;
  title?: string;
  overview?: string;
  id: number;
}

export const BaseCard = ({
  poster_path = "/no_image.png",
  title = "No Title",
  overview = "No Overview",
  id,
}: CardProps) => {
  const imgUrl =
    poster_path.indexOf("no_image.png") !== -1
      ? poster_path
      : `${TMDB_IMAGE_URL}/w400${poster_path}`;

  return (
    <Card maxW="md">
      <CardBody>
        <Flex alignItems={"center"} justifyContent={"center"}>
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
          >
            {overview ? overview : "등록된 정보가 없습니다."}
          </Text>
        </Stack>
      </CardBody>
      <Divider color={useColorModeValue("teal.600", "white")} />
      <CardFooter alignItems={"center"} justifyContent={"space-between"}>
        <HStack></HStack>
        <HStack>
          <Button
            as={"a"}
            href={`/details/${id}`}
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
