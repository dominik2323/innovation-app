import React from 'react';
import { useSelector } from 'react-redux';

import InnovationUiSidebarDetailAbout from './InnovationUiSidebarDetailAbout';
import InnovationUiSidebarDetailAuthors from './InnovationUiSidebarDetailAuthors';
import InnovationUiSidebarDetailFiles from './InnovationUiSidebarDetailFiles';
import Scrollbar from './Scrollbar';

const InnovationUiSidebarDetail = () => {
  const activeInnovationId = useSelector((state) => state.activeInnovationId);

  const classNamePrefix = `innovation-ui__sidebar__content__detail`;
  const prevActiveInnovationId = React.useRef(null);

  React.useEffect(() => {
    if (activeInnovationId !== prevActiveInnovationId) {
      document.querySelector(
        `#sidebar-detail .scrollbar-scroller`
      ).scrollTop = 0;
      prevActiveInnovationId.current = activeInnovationId;
    }
  }, [activeInnovationId]);

  return (
    <div className={classNamePrefix}>
      <Scrollbar vTrackStyle={{ right: 15 }} id={`sidebar-detail`}>
        <div className={`${classNamePrefix}__wrapper`}>
          <InnovationUiSidebarDetailAbout />
          <InnovationUiSidebarDetailAuthors />
        </div>
      </Scrollbar>
      <InnovationUiSidebarDetailFiles />
    </div>
  );
};

export default InnovationUiSidebarDetail;
