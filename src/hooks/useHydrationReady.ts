import { useEffect, useState } from "react";

export function useHydrationReady<TStore extends { hasHydrated: boolean }>(
  useStore: () => TStore
): boolean {
  const hasHydrated = useStore().hasHydrated;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (hasHydrated) setReady(true);
  }, [hasHydrated]);

  return ready;
}
