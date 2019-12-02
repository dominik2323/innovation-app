import React from "react";
import IntroAnnotation from "./InnovationUiSidebarIntroAnnotation";
import IntroBullets from "./InnovationUiSidebarIntroBullets";
import Scrollbar from "./Scrollbar";

const InnovationUiSidebarIntro = () => {
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
