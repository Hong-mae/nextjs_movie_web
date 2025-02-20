"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { CssBaseline, styled, ThemeProvider } from "@mui/material";
import theme from "@/theme";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import { usePathname } from "next/navigation";
import ElevationScroll from "@/components/molecules/ElevationScroll";
import React from "react";

import "./globals.css";
import { AccountsStoreProvider } from "@/stores/AccountsStore/provider";

interface RootLayoutProps {
  children: React.ReactNode;
}

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  const pahtname = usePathname();
  const isMainPage = pahtname === "/";

  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <InitColorSchemeScript attribute="class" />
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ThemeProvider theme={theme}>
            <AccountsStoreProvider>
              <CssBaseline />
              {isMainPage ? (
                <ElevationScroll children={Navbar()}></ElevationScroll>
              ) : (
                <>
                  <Offset />
                  <Navbar />
                </>
              )}
              {children}
              <Footer />
            </AccountsStoreProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
