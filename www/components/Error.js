import NextError from 'next/error';
import React from 'react';
import Header from './Header';

const Error = ({ message, statusCode }) => {
  console.log(message);
  return (
    <>
      <Header descriptor={`message`} />
      <NextError title={message} statusCode={statusCode} />
    </>
  );
};

export default Error;
