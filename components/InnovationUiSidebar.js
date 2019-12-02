import React from "react";
import { DataContext } from "../helpers/dataContext";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";

import Link from "./Link";
import Button from "./Button";
import { selectInnovationById } from "../helpers/functions";
import { useViewportDimensions } from "../hooks/useViewportDimensions";
import {
  toggleSidebar,
  toggleNavbarSearch,
  toggleNavbarDownload
} from "../store/actions";
import InnovationUiSidebarIntro from "./InnovationUiSidebarIntro";
import InnovationUiSidebarDetail from "./InnovationUiSidebarDetail";
const transition = {
  type: "spring",
  damping: 100,
  velocity: 1
};
const InnovationUiSidebar = () => {
  const { innovations } = React.useContext(DataContext);
  const dispatch = useDispatch();
  const { activeInnovationId, showSidebar } = useSelector(state => state);
  const { w } = useViewportDimensions();
  const { innovationName, perex, benefits } = selectInnovationById(
    innovations,
    activeInnovationId
  );

  const sidebarVariants = {
    show: { x: "0%", transition },
    hide: { x: "100%", transition },
    half: { x: w <= 1200 ? `0%` : `calc(61.8% - 15px)`, transition }
  };

  const isSidebarHidden = showSidebar === `hide`;
  return (
    <motion.div
      variants={sidebarVariants}
      animate={showSidebar}
      initial={false}
      className={`innovation-ui__sidebar`}
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`innovation-ui__sidebar__toggler ${
          isSidebarHidden ? `hidden` : `shown`
        }`}
        onClick={() => {
          dispatch(toggleNavbarSearch(false));
          dispatch(toggleNavbarDownload(false));
          dispatch(toggleSidebar(isSidebarHidden ? `half` : `hide`));
        }}
      />
      <div className={`innovation-ui__sidebar__content`}>
        <InnovationUiSidebarIntro />
        <InnovationUiSidebarDetail />
      </div>
    </motion.div>
  );
};

export default InnovationUiSidebar;
