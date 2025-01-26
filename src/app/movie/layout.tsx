"use client";

import Navbar from "@/components/organisms/Navbar";
import { styled } from "@mui/material";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export default function MovieListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Offset />
      {children}
    </>
  );
}
