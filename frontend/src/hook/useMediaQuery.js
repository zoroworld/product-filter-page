import { useState, useEffect } from "react";

/**
 * Custom hook to track if a media query matches.
 * Example: const isMobile = useMediaQuery("(max-width: 768px)");
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = (event) => setMatches(event.matches);
    mediaQuery.addEventListener("change", handleChange);

    // cleanup listener on unmount
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}
