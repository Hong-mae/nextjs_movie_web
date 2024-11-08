import { MovieFilter } from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Link,
  Toolbar,
  useScrollTrigger,
} from "@mui/material";
import React, { useState } from "react";

interface Props {
  window?: () => Window;
  children?: React.ReactElement<any>;
  // custom props
  threshold?: number;
  bgColorBefore?: string;
  bgColorAfter?: string;
  txtColorBefore?: string;
  txtColorAfter?: string;
  fadeIn?: string;
  fadeOut?: string;
  paddingBefore?: string;
  paddingAfter?: string;
  isMain?: boolean;
}

// const navItems = ["상영 중", "인기 영화", "최고 평점", "개봉 예정"];
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
    title: "개봉 예정",
    href: "/movie/upcoming",
  },
];
const ElevationScroll = (props: Props) => {
  const {
    window,
    children,
    threshold = 0,
    bgColorBefore = "transparent",
    bgColorAfter = "#303030",
    fadeIn = "0.5s ease-in",
    fadeOut = "0.5s ease-out",
    paddingBefore = "1.5rem",
    paddingAfter = "0",
    isMain = true,
  } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: threshold,
    target: window ? window() : undefined,
  });

  let nav = null;

  if (isMain) {
    nav = children
      ? React.cloneElement(children, {
          elevation: 0,
          style: {
            color: "white",
            transition: trigger ? fadeIn : fadeOut,
            padding: trigger ? `${paddingAfter} 0` : `${paddingBefore} 0`,
            backgroundColor: trigger ? bgColorAfter : bgColorBefore,
            backgroundImage:
              "linear-gradient(180deg, rgba(48,48,48,1), transparent)",
          },
        })
      : null;
  } else {
    nav = children
      ? React.cloneElement(children, {
          elevation: 0,
          style: {
            color: "white",
            backgroundColor: bgColorAfter,
          },
        })
      : null;
  }

  return nav;
};

const Header = (props: Props) => {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <ElevationScroll {...props}>
      <AppBar>
        <Toolbar>
          <Link href="/" sx={{ color: "inherit" }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MovieFilter />
            </IconButton>
          </Link>
          <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "end" }}>
            {navItems.map((item, i) => (
              <Link key={i} href={item.href} sx={{ color: "inherit" }}>
                <Button key={item.title} sx={{ color: "inherit" }}>
                  {item.title}
                </Button>
              </Link>
            ))}
          </Box>
          {loggedIn ? (
            <Link href="/logout" color="inherit">
              <Button color="inherit">Logout</Button>
            </Link>
          ) : (
            <Link href="/login" color="inherit">
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default Header;
