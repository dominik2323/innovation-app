import React from 'react';
import { useViewportDimensions } from '../hooks/useViewportDimensions';
import { useCountUp } from 'react-countup';

const IntroNumber = ({ number }) => {
  const { w, h } = useViewportDimensions();
  const { countUp } = useCountUp({ end: number, delay: 0.3, duration: 4 });
  return (
    <div className={`intro__number`}>
      <svg
        preserveAspectRatio="xMidYMid meet"
        x="0"
        y="0"
        height={h - 60}
        width={w}
        viewBox={`0 0 ${w} ${h - 60}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <text
          x={`50%`}
          y={`50%`}
          dy=".1em"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {countUp}
        </text>
      </svg>
    </div>
  );
};

export default IntroNumber;
