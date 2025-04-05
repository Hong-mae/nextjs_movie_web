"use client";

import { usePathname } from "next/navigation";
import { CssBaseline, styled } from "@mui/material";
import { ScrollNavbar, Navbar } from "@/components/organisms/Navbar";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  return (
    <>
      {isMainPage ? (
        <ScrollNavbar />
      ) : (
        <>
          <Navbar elevation={4} />
          <Offset />
        </>
      )}
      {children}
    </>
  );
}
