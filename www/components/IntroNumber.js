import React from "react";
import { useViewportDimensions } from "../hooks/useViewportDimensions";
import { useCountUp } from "react-countup";

const IntroNumber = ({ number }) => {
  const { w, h } = useViewportDimensions();
  const { countUp } = useCountUp({ end: number, delay: 0.3, duration: 4 });
  return (
    <div className={`intro__number`}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 282.58 306.32">
        <defs></defs>
        <title>Asset 1</title>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <text
              className="cls-1"
              textAnchor="middle"
              x="50%"
              dx="-0.08em"
              transform="translate(3.58 233.6)"
            >
              {countUp}
            </text>
            <rect className="cls-2" width="282.58" height="306.32" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default IntroNumber;
