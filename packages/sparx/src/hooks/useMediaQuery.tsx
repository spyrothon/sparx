import * as React from "react";

export function useMediaQuery(query: string, fallback?: boolean): boolean {
  function testQueryMatch(query: string) {
    // Prevents SSR issues
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return false;
  }

  const [matches, setMatches] = React.useState<boolean>(fallback ?? testQueryMatch(query));

  React.useEffect(() => {
    function handleChange() {
      setMatches(testQueryMatch(query));
    }
    // Invoke once immediately to set the value on load.
    handleChange();

    const matchMedia = window.matchMedia(query);
    matchMedia.addEventListener("change", handleChange);
    return () => matchMedia.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}
