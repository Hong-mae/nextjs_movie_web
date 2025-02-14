"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";

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
  fn: (target: string, pageParam: number) => any;
}

export const useFetchLists = ({ key, target, fn }: Props) => {
  console.log(fn);
  return useInfiniteQuery({
    queryKey: key,
    queryFn: async ({ pageParam }) => {
      const data = await fn(target, pageParam);

      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (data) => {
      return data.page + 1;
    },
  });
};
