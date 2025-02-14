"use client";

import Navbar from "@/components/organisms/Navbar";
import { YTDialogStoreProvider } from "@/stores/YoutubeDialogStore/provider";
import { styled } from "@mui/material";

export default function MovieDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <YTDialogStoreProvider>{children}</YTDialogStoreProvider>;
}
