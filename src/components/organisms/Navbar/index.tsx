import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Container,
  useColorMode,
  HStack,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";

export const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      position={"fixed"}
      top={0}
      left={0}
      right={0}
      borderBottom={1}
      borderStyle={"solid"}
      borderColor={"blue.100"}
      bg={useColorModeValue("white", "gray.800")}
      px={4}
    >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        color={useColorModeValue("teal.600", "white")}
      >
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />

        <HStack alignItems={"center"}>
          <Box as="a" href="/">
            Logo
          </Box>
        </HStack>

        <HStack alignItems={"center"}>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
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
    href: "/popular",
  },
  {
    label: "상영중",
    href: "/now_playing",
  },
  {
    label: "상영 예정",
    href: "/upcoming",
  },
];
