import React from 'react';
import { useSelector } from 'react-redux';

import InnovationContents from './InnovationContents';
import InnovationBg from './InnovationBg';
import InnovationUi from './InnovationUi';
import { useViewportDimensions } from '../hooks/useViewportDimensions';
import { VH, VW } from '../helpers/consts';

const transition = {
  type: 'spring',
  damping: 100,
  velocity: 1,
};

const variants = {
  innovationContents: w => ({
    show: { x: `${0}px`, transition },
    hide: {
      x: w <= 992 ? VW() : `${VW(-0.5) - (VH() - 60) / 2}px`,
      transition,
    },
  }),
  innovationBg: {
    shrink: { width: `${(100 / 20) * 11}vw`, transition },
    grow: {
      width: VW(),
      transition,
    },
  },
};

const Innovation = () => {
  const { activeInnovationId } = useSelector(state => state);
  const { w } = useViewportDimensions();
  return (
    <div className={`innovation`}>
      <InnovationContents
        initial={false}
        variants={variants.innovationContents(w)}
        animate={activeInnovationId.length !== 0 ? `hide` : `show`}
      />
      <InnovationUi />
      <InnovationBg
        key={`innovationBg${w}`}
        initial={false}
        variants={variants.innovationBg}
        animate={activeInnovationId.length !== 0 ? `grow` : `shrink`}
      />
    </div>
  );
};

export default Innovation;
