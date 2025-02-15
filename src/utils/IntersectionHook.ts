"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
import { getMovieList } from "./tmdbController";
import { convertImageURL } from "./urlController";

type IntersectHandler = (
  entry: IntersectionObserverEntry,
  observer: IntersectionObserver
) => void;

export const useIntersect = (
  onIntersect: IntersectHandler,
  options?: IntersectionObserverInit
) => {
  const ref = useRef<HTMLElement>(null);
  const callback = useCallback(
    (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) onIntersect(entry, observer);
      });
    },
    [onIntersect]
  );

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, options, callback]);

  return ref;
};

interface Props {
  key: ReadonlyArray<string>;
  target: string;
}

export const useFetchLists = ({ key, target }: Props) => {
  return useInfiniteQuery({
    queryKey: key,
    queryFn: async ({ pageParam }) => {
      const data = await getMovieList(target, pageParam);

      data.results = data.results.map((e: MovieInfoProps) => {
        return {
          ...e,
          poster_path: convertImageURL(e.poster_path, 185),
        };
      });

      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (data) => {
      return data.page + 1;
    },
  });
};
