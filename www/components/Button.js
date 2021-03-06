import React from 'react';

const Button = ({
  handleClick = () => null,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={`btn ${className}`}
      onClick={() => handleClick()}
      {...props}
    >
      {children.toUpperCase()}
    </button>
  );
};

export default Button;
