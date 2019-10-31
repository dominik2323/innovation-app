import React from 'react';
import Img from './Img';

const IntroBg = ({ path }) => {
  return (
    <div className={`intro__bg`}>
      <Img src={path} />
    </div>
  );
};

export default IntroBg;
