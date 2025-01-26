"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import {
  AppBar,
  Box,
  Button,
  Container,
  CssBaseline,
  IconButton,
  Link,
  ThemeProvider,
  Toolbar,
} from "@mui/material";
import theme from "@/theme";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import { usePathname } from "next/navigation";
import ElevationScroll from "@/components/molecules/ElevationScroll";
import { AccountCircle, MovieFilter } from "@mui/icons-material";
import React, { createElement, memo } from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

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

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const pahtname = usePathname();
  const isMainPage = pahtname === "/";

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {isMainPage ? <ElevationScroll children={Navbar()} /> : <Navbar />}
            {children}
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
