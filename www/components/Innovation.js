import React from 'react';
import { useSelector } from 'react-redux';

import InnovationContents from './InnovationContents';
import InnovationBg from './InnovationBg';
import InnovationUi from './InnovationUi';
import { useViewportDimensions } from '../hooks/useViewportDimensions';
import { selectInnovationById } from '../helpers/selectInnovationById';
import { DataContext } from '../helpers/dataContext';
import { useAuth } from '../hocs/auth';

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
  const { activeInnovationId } = useSelector((state) => state);
  const { innovations } = React.useContext(DataContext);
  const { is_secret } = selectInnovationById(innovations, activeInnovationId);
  const { isAllowed } = useAuth();
  const { w, h } = useViewportDimensions();

  if (!!activeInnovationId && !isAllowed && is_secret) return null;

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
