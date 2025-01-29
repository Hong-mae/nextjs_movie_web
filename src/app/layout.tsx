"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/theme";
import Navbar from "@/components/organisms/Navbar";
import Footer from "@/components/organisms/Footer";
import { usePathname } from "next/navigation";
import ElevationScroll from "@/components/molecules/ElevationScroll";
import React from "react";

interface RootLayoutProps {
  children: React.ReactNode;
}

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
