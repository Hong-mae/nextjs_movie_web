"use client";

import { MLStoreProvider } from "@/stores/MovieListStore/provider";

export default function MovieDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MLStoreProvider>{children}</MLStoreProvider>;
}
