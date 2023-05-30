import { useEffect } from "react";
import { useLocation } from "react-router";

interface IProps {
  children?: JSX.Element | string;
}

export default function ScrollToTop({ children }: IProps): JSX.Element {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{children}</>;
}
