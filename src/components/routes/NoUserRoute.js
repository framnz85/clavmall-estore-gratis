import { useEffect } from "react";
import { useParams } from "react-router-dom";

import NoStore from "../../pages/NoStore";

const NoUserRoute = ({ children, setSlug, estore }) => {
  const { slug } = useParams();

  useEffect(() => {
    if (slug) {
      setSlug(slug);
    }
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  return estore && estore._id ? <>{children}</> : <NoStore />;
};

export default NoUserRoute;
