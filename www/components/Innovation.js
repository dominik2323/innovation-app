import React from 'react';
import { useSelector } from 'react-redux';

import InnovationContents from './InnovationContents';
import InnovationBg from './InnovationBg';
import InnovationUi from './InnovationUi';
import { useViewportDimensions } from '../hooks/useViewportDimensions';

const transition = {
  type: 'spring',
  damping: 100,
  velocity: 1,
};

const variants = {
  innovationContents: {
    show: ({ w }) => ({ x: 0, transition }),
    hide: ({ w, h }) => ({
      x: w <= 1200 ? -1 * w : w * -0.5 - (h - 60) / 2,
      transition,
    }),
  },
  innovationBg: {
    shrink: ({ w }) => ({ width: (w / 20) * 11, transition }),
    grow: ({ w }) => ({
      width: w,
      transition,
    }),
  },
};

const Innovation = () => {
  const { activeInnovationId } = useSelector(state => state);
  const { w, h } = useViewportDimensions();
  return (
    <div className={`innovation`}>
      <InnovationContents
        key={`innovationContents_${w}_${h}`}
        initial={false}
        variants={variants.innovationContents}
        custom={{ w, h }}
        animate={activeInnovationId.length !== 0 ? `hide` : `show`}
      />
      <InnovationUi />
      <InnovationBg
        key={`innovationBg_${w}_${h}`}
        initial={false}
        variants={variants.innovationBg}
        custom={{ w, h }}
        animate={activeInnovationId.length !== 0 ? `grow` : `shrink`}
      />
    </div>
  );
};

export default Innovation;
