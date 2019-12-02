import React from "react";
import InnovationUiSidebarDetailAbout from "./InnovationUiSidebarDetailAbout";
import InnovationUiSidebarDetailAuthors from "./InnovationUiSidebarDetailAuthors";
import InnovationUiSidebarDetailFiles from "./InnovationUiSidebarDetailFiles";
import Scrollbar from "./Scrollbar";

const InnovationUiSidebarDetail = () => {
  const classNamePrefix = `innovation-ui__sidebar__content__detail`;
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
