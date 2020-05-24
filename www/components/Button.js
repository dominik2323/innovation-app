import React from 'react';

const Button = ({
  handleClick = () => null,
  className,
  children,
  isLoading = false,
  ...props
}) => {
  return (
    <button
      className={`btn ${className}`}
      onClick={() => handleClick()}
      {...props}
    >
      {isLoading && <div className={`loading`} />}
      {children.toUpperCase()}
    </button>
  );
};

export default Button;
