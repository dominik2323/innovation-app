import React from 'react';

const Link = ({
  isLoading = false,
  handleClick = () => null,
  className,
  children,
  ...props
}) => {
  return (
    <span
      className={`link ${className}`}
      onClick={() => handleClick()}
      {...props}
    >
      {isLoading && (
        <span
          style={{
            borderColor: 'rgba(75, 168, 46, 0.2)',
            borderLeftColor: '#ffffff',
          }}
          className={`loading`}
        />
      )}
      {children}
    </span>
  );
};

export default Link;
