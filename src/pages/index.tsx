import React from "react";
import { Container } from "@chakra-ui/react";
import { getMoiveList } from "@/lib/tmdbController";

interface Props {
  topRated: any;
}

const index = ({ topRated }: Props) => {
  return (
    <Container mt={16} maxW={"container.xl"}>
      영화보자구
    </Container>
  );
};

export default index;
