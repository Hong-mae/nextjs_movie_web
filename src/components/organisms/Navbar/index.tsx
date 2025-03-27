"use client";

import { useHydrationReady } from "@/hooks/useHydrationReady";
import ModeSwitch from "@/components/molecules/ModeSwitch";
import useAuthStore from "@/stores/authStore";
import {
  AccountCircle,
  Favorite,
  Grade,
  LocalMovies,
  Menu,
  MovieFilter,
  Schedule,
  Settings,
} from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import React, { useState } from "react";

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

interface NavbarProps {
  elevation?: number;
  style?: React.CSSProperties;
}

export const Navbar: React.FC<NavbarProps> = ({ elevation = 0, style }) => {
  const [anchorElNav, setAnchorElNav] = useState(false);
  const [anchorElSettings, setAnchorElSettings] = useState(false);

  const ready = useHydrationReady(useAuthStore);
  const user = useAuthStore((state) => state.user);

  const toggleDrawer = () => {
    setAnchorElSettings((prevState) => !prevState);
  };

  const toggleNav = () => {
    setAnchorElNav((prevState) => !prevState);
  };

  const SettingsList = (
    <Box
      sx={{ width: 300, bgcolor: "#303030", color: "white", height: "100%" }}
      role="presentation"
    >
      <List>
        <ListItem disablePadding>
          <ModeSwitch />
        </ListItem>
      </List>
    </Box>
  );

  const NavList = (
    <Box
      sx={{ width: 180, bgcolor: "#303030", color: "white", height: "100%" }}
    >
      <List>
        {navItems.map((item, i) => {
          let icons = null;

          switch (i) {
            case 0: // 상영 중인 영화
              icons = <LocalMovies />;
              break;
            case 1: // 인기 영화
              icons = <Favorite />;
              break;
            case 2: // 최고 평점
              icons = <Grade />;
              break;
            case 3: // 개봉 예정
              icons = <Schedule />;
              break;
          }

          return (
            <ListItem key={`${item.title}_${i}`} disablePadding>
              <ListItemButton href={item.href}>
                <ListItemIcon sx={{ color: "white" }}>{icons}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  if (!ready) return null;

  return (
    <AppBar
      component={"nav"}
      sx={{ bgcolor: "#303030" }}
      elevation={elevation}
      style={style}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop Navbar */}
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
              flexGrow: 2,
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
              href={user ? "/my" : "/sign-in"}
            >
              {user == null ? (
                <AccountCircle fontSize="inherit" />
              ) : (
                <Avatar
                  alt={user.email}
                  src={user.profileUrl}
                  sx={{ width: 28, height: 28 }}
                />
              )}
            </IconButton>
            <IconButton
              size="large"
              aria-label="settings"
              sx={{ color: "white" }}
              onClick={toggleDrawer}
            >
              <Settings fontSize="inherit" />
            </IconButton>
            <Drawer
              open={anchorElSettings}
              onClose={toggleDrawer}
              anchor="right"
            >
              {SettingsList}
            </Drawer>
          </Box>
          {/* Desktop Navbar */}
          {/* Mobile Navbar */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              sx={{
                display: { xs: "flex", md: "none" },
                mr: 1,
                color: "white",
              }}
              aria-label="nav"
              onClick={toggleNav}
            >
              <Menu />
            </IconButton>
          </Box>
          <Drawer open={anchorElNav} onClose={toggleNav}>
            {NavList}
          </Drawer>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <Link href="/">
              <IconButton
                size="large"
                sx={{
                  display: { xs: "flex", md: "none" },
                  mr: 1,
                  color: "white",
                }}
                aria-label="logo"
              >
                <MovieFilter fontSize="inherit" />
              </IconButton>
            </Link>
          </Box>
          <Box sx={{ flexGrow: 0, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account"
              sx={{ color: "white", display: { xs: "flex", md: "none" } }}
            >
              {user == null ? (
                <AccountCircle fontSize="inherit" />
              ) : (
                <Avatar
                  alt={user.email}
                  src={user.profileUrl}
                  sx={{ width: 20, height: 20 }}
                />
              )}
            </IconButton>
            <IconButton
              size="large"
              aria-label="settings"
              sx={{ color: "white", display: { xs: "flex", md: "none" } }}
              onClick={toggleDrawer}
            >
              <Settings fontSize="inherit" />
            </IconButton>
          </Box>
          {/* Mobile Navbar */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export const ScrollNavbar = () => {
  const trigger = useScrollTrigger({ disableHysteresis: true, threshold: 0 });

  return (
    <Navbar
      elevation={trigger ? 4 : 0}
      style={{
        transition: "all 0.3s ease-in-out",
        backgroundColor: trigger ? "#303030" : "transparent",
        padding: trigger ? "0" : "1.5rem 0",
        backgroundImage: trigger
          ? "linear-gradient(180deg, rgba(48,48,48,1), transparent)"
          : "none",
      }}
    />
  );
};
