"use client";

import { MovieImgList } from "@/components/molecules/ImageList";
import { useFetchLists, useIntersect } from "@/utils/IntersectionHook";
import { Box } from "@mui/material";
import React, { useMemo } from "react";

interface InfiniteScrollProps {
  pageNumber: number;
  target: string;
  fn: () => any;
}

const InfiniteScroll = ({ pageNumber, target, fn }: InfiniteScrollProps) => {
  const { data, hasNextPage, isFetching, fetchNextPage } = useFetchLists({
    key: ["MovieList"],
    target,
    fn,
  });

  const newList = useMemo(
    () => (data ? data.pages.flatMap((e) => e.results) : []),
    [data]
  );

  const ref = useIntersect(
    async (entry, observer) => {
      observer.unobserve(entry.target);

      if (hasNextPage && !isFetching) {
        fetchNextPage();
      }
    },
    {
      threshold: 0.2,
    }
  );

  return (
    <React.Fragment>
      <MovieImgList list={newList} />
      <Box sx={{ height: 100 }} ref={ref} />
    </React.Fragment>
  );
};

export default InfiniteScroll;
