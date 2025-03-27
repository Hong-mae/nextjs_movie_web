"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { CssBaseline, styled, ThemeProvider } from "@mui/material";
import theme from "@/theme";
import Footer from "@/components/organisms/Footer";
import { usePathname } from "next/navigation";
import React from "react";
import "./globals.css";
import { AccountsStoreProvider } from "@/stores/AccountsStore/provider";
import { ScrollNavbar, Navbar } from "@/components/organisms/Navbar";

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
            <CssBaseline />
            {isMainPage ? (
              <ScrollNavbar />
            ) : (
              <>
                <Navbar elevation={4} />
                <Offset />
              </>
            )}
            {children}
            <Footer />
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
};

export default RootLayout;
