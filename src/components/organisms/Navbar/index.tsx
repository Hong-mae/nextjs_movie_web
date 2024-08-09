import {
  Box,
  Flex,
  IconButton,
  Stack,
  useColorModeValue,
  useDisclosure,
  Container,
  useColorMode,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BiSolidCameraMovie } from "react-icons/bi";

import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon,
  SunIcon,
  Icon,
} from "@chakra-ui/icons";

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const px = useBreakpointValue({ base: "16px", md: "16px" });

  return (
    <Box
      as="header"
      position={"sticky"}
      top={0}
      left={0}
      right={0}
      width={"full"}
      bg={useColorModeValue("white", "gray.800")}
      boxShadow={"sm"}
      zIndex={11}
    >
      <Box mx={"auto"} maxW={"8xl"} h={"4.5rem"} px={4}>
        <Flex
          alignItems={"center"}
          justifyContent={"space-between"}
          color={useColorModeValue("teal.600", "white")}
          w={"100%"}
          h={"100%"}
          px={4}
        >
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />

          <HStack alignItems={"center"}>
            <Box
              as="a"
              href="/"
              p={4}
              color={useColorModeValue("teal.600", "white")}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              fontWeight={"bold"}
            >
              <Icon as={BiSolidCameraMovie} boxSize={8} />
              Movie
            </Box>
          </HStack>

          <HStack alignItems={"center"}>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {NAV_ITEM.map((item) => {
                return (
                  <NavLink key={item.label} href={item.href}>
                    {item.label}
                  </NavLink>
                );
              })}
            </HStack>
            <IconButton
              icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              aria-label={"Open Menu"}
              onClick={toggleColorMode}
            />
          </HStack>
        </Flex>
      </Box>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack>
            {NAV_ITEM.map((item) => {
              return (
                <NavLink key={item.label} href={item.href}>
                  {item.label}
                </NavLink>
              );
            })}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
};

interface Props {
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ href, children }: Props) => {
  return (
    <Box
      as="a"
      rounded={"md"}
      href={href}
      color={useColorModeValue("teal.600", "white")}
      fontWeight={"bold"}
      px={4}
      py={2}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.500", "teal.100"),
        color: useColorModeValue("white ", "gray.600"),
      }}
    >
      {children}
    </Box>
  );
};

const NAV_ITEM = [
  {
    label: "인기 영화",
    href: "/movies/popular",
  },
  {
    label: "상영중",
    href: "/movies/now_playing",
  },
  {
    label: "상영 예정",
    href: "/movies/upcoming",
  },
  {
    label: "높은 평점",
    href: "/movies/top_rated",
  },
];
