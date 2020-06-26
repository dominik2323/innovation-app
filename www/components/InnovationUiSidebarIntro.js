import React from "react";
import { useSelector } from "react-redux";

import IntroAnnotation from "./InnovationUiSidebarIntroAnnotation";
import IntroBullets from "./InnovationUiSidebarIntroBullets";
import Scrollbar from "./Scrollbar";

const InnovationUiSidebarIntro = () => {
  const prevActiveInnovationId = React.useRef(null);
  const activeInnovationId = useSelector(state => state.activeInnovationId);

  React.useEffect(() => {
    if (activeInnovationId !== prevActiveInnovationId) {
      document.querySelector(
        `.innovation-ui__sidebar__content__intro .scrollbar-scroller`
      ).scrollTop = 0;
      prevActiveInnovationId.current = activeInnovationId;
    }
  }, [activeInnovationId]);
  return (
    <div className={`innovation-ui__sidebar__content__intro`}>
      <Scrollbar vTrackStyle={{ top: 0, right: 0 }}>
        <IntroAnnotation />
        <IntroBullets />
      </Scrollbar>
    </div>
  );
};

export default InnovationUiSidebarIntro;
