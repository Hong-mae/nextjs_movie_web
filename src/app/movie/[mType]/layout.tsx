"use client";

import { MLStoreProvider } from "@/stores/MovieListStore/provider";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function MovieDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <MLStoreProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MLStoreProvider>
  );
}
