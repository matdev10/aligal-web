import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function GoogleAnalytics() {
  const location = useLocation();
  const skipInitialPageView = useRef(true);

  useEffect(() => {
    if (typeof window.gtag !== "function") {
      return;
    }

    if (skipInitialPageView.current) {
      skipInitialPageView.current = false;
      return;
    }

    window.gtag("event", "page_view", {
      page_path: `${location.pathname}${location.search}`,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [location.pathname, location.search]);

  return null;
}

export default GoogleAnalytics;
