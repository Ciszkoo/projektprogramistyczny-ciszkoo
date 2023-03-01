import { useEffect } from "react";
import { useLocation, useNavigation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const { location } = useNavigation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location, pathname]);

  return null;
};

export default ScrollToTop;
