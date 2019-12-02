import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import InnovationContents from "./InnovationContents";
import InnovationBg from "./InnovationBg";
import InnovationUi from "./InnovationUi";
import Button from "./Button";
import { DataContext } from "../helpers/dataContext";
import { useViewportDimensions } from "../hooks/useViewportDimensions";

const transition = {
  type: "spring",
  damping: 100,
  velocity: 1
};

const variants = {
  container: {
    initial: { x: "100%", transition },
    enter: { x: "0vw", transition },
    exit: { x: "100%", transition }
  },
  innovationContents: w => ({
    show: { x: 0, transition },
    // hide: { x: 'calc(-50vw - ((100vh - 60px) / 2))', transition }
    hide: {
      x: w <= 992 ? "-100%" : "calc(-50vw - ((100vh - 60px) / 2))",
      transition
    }
  }),
  innovationBg: {
    shrink: { width: `${(100 / 20) * 11}vw`, transition },
    grow: {
      width: "100vw",
      transition
    }
  }
};

const Innovation = () => {
  const { innovations } = React.useContext(DataContext);
  const { activeInnovationId } = useSelector(state => state);
  const { w } = useViewportDimensions();
  return (
    <div className={`innovation`}>
      <InnovationContents
        initial={false}
        variants={variants.innovationContents(w)}
        animate={activeInnovationId.length !== 0 ? `hide` : `show`}
      />
      <InnovationBg
        initial={false}
        variants={variants.innovationBg}
        animate={activeInnovationId.length !== 0 ? `grow` : `shrink`}
      />
      <InnovationUi />
    </div>
  );
};

export default Innovation;
