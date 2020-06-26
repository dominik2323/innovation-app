import React from "react";

const Img = ({ src, handleLoad = () => null, ...props }, ref) => {
  return <img ref={ref} onLoad={() => handleLoad()} src={src} {...props} />;
};

export default React.forwardRef(Img);
