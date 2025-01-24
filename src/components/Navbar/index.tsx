import {
  AccountBox,
  AccountCircle,
  Menu as MenuIcon,
  MovieFilter,
  Settings,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  styled,
  Toolbar,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const navItems = [
  {
    title: "상영 중",
    href: "/movie/now_playing",
  },
  {
    title: "인기 영화",
    href: "/movie/popular",
  },
  {
    title: "최고 평점",
    href: "/movie/top_rated",
  },
  {
    title: "개봉 임박",
    href: "/movie/upcoming",
  },
];
const settings = ["내 정보", "Logout"];
const themeMode = ["light", "dark", "system"];

const Navbar = () => {
  // const [anchorNav, setAnchorNav] = useState<null | HTMLElement>(null);
  // const [anchorUser, setAnchorUser] = useState<null | HTMLElement>(null);

  // const handleOpenNavMenu = (e: React.MouseEvent<HTMLElement>) => {
  //   setAnchorNav(e.currentTarget);
  // };
  // const handleOpenUserMenu = (e: React.MouseEvent<HTMLElement>) => {
  //   setAnchorUser(e.currentTarget);
  // };
  // const handleCloseNavMenu = () => {
  //   setAnchorNav(null);
  // };
  // const handleCloseUserMenu = () => {
  //   setAnchorUser(null);
  // };

  return (
    <AppBar component={"nav"}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/">
            <IconButton
              size="large"
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                color: "white",
              }}
              aria-label="logo"
            >
              <MovieFilter fontSize="inherit" />
            </IconButton>
          </Link>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            {navItems.map((item) => (
              <Link
                variant="button"
                key={item.title}
                href={item.href}
                underline="none"
              >
                <Button sx={{ color: "white" }}>{item.title}</Button>
              </Link>
            ))}
            <IconButton
              size="large"
              aria-label="account"
              sx={{ color: "white" }}
            >
              <AccountCircle fontSize="inherit" />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
