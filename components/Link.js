import React from 'react';

const Link = ({ handleClick = () => null, className, children, ...props }) => {
  return (
    <span
      className={`link ${className}`}
      onClick={() => handleClick()}
      {...props}
    >
      {children}
    </span>
  );
};

export default Link;
