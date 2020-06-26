import React from 'react';
import Button from './Button';

function AuthSuccess({
  error,
  buttonText,
  header,
  redirectTo,
  perex,
  status,
  children,
}) {
  return (
    <div className={`auth`}>
      <div className={`auth__wrap`}>
        {!!error && (
          <div className={`auth__wrap__response auth__wrap__response--error`}>
            {error}
          </div>
        )}
        {!!status && (
          <div className={`auth__wrap__response auth__wrap__response--status`}>
            {status}
          </div>
        )}
        <div className={`auth__wrap__intro`}>
          <h1>{header}</h1>
          <p>{perex}</p>
        </div>
        <Button className={`btn__primary`} handleClick={redirectTo}>
          {buttonText}
        </Button>
        {children}
      </div>
    </div>
  );
}

export default AuthSuccess;
