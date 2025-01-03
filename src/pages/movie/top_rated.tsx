import CardList from "@/components/organisms/CardList";
import { useFetchLists, useIntersect } from "@/utils/IntersectionHook";
import { Box, CircularProgress, Toolbar } from "@mui/material";
import Head from "next/head";
import React, { useMemo, useState } from "react";

const top_rated = () => {
  const { data, hasNextPage, isFetching, fetchNextPage } = useFetchLists({
    target: "top_rated",
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
    <>
      <Head>
        <title>최고 평점 | Watch Movie</title>
      </Head>
      <Box>
        <Toolbar />
        <CardList list={newList} />
        {isFetching && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: 500,
              p: 2,
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
      <Box sx={{ height: 100 }} ref={ref} />
    </>
  );
};

export default top_rated;
