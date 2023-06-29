import React, { useState, useEffect } from "react";

import noImage from "../../images/noimage.jpg";

const ImageShow = ({ alt, imgid, style = {}, type = "" }) => {
  const [image, setImage] = useState(noImage);

  useEffect(() => {
    let isSubscribed = true;
    handleCheckImage(isSubscribed);
    return () => (isSubscribed = false);
  }, [imgid]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCheckImage = (isSubscribed) => {
    let image1 = "";

    image1 =
      process.env.REACT_APP_CLAVMALL_IMG +
      "/estore_images/estoregratis/" +
      imgid;

    checkIfImageExists(image1, (exist1) => {
      if (exist1 && isSubscribed) {
        return setImage(image1);
      }
    });
  };

  const checkIfImageExists = (url, callback) => {
    const img = new Image();
    img.src = url;

    if (img.complete) {
      callback(true);
    } else {
      img.onload = () => {
        callback(true);
      };

      img.onerror = () => {
        callback(false);
      };
    }
  };

  return image.length && <img alt={alt} src={image} style={style} />;
};

export default ImageShow;
