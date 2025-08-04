import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// This component will scroll to top when route changes
const ScrollToTopOnMount = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTopOnMount;