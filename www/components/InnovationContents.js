import React from "react";
import { motion } from "framer-motion";
import Router from "next/router";
import { useDispatch } from "react-redux";
import {
  setActiveInnovationId,
  setHoverInnovationId,
  setCurrentSlideshowIndex,
  toggleSidebar
} from "../store/actions";

import { DataContext } from "../helpers/dataContext";
import Link from "./Link";
import Scrollbar from "./Scrollbar";

const InnovationContents = ({ ...props }) => {
  const { components, innovations } = React.useContext(DataContext);
  const prevHoveredEl = React.useRef(null);
  const dispatch = useDispatch();
  const { innovationsContents } = components;

  const handleClick = e => {
    Router.push({
      pathname: `/innovations`,
      query: { id: e.currentTarget.id }
    });
    dispatch(setActiveInnovationId(e.currentTarget.id));
    dispatch(setCurrentSlideshowIndex(0));
    dispatch(toggleSidebar(`half`));
  };

  const handleHover = e => {
    if (prevHoveredEl.current !== null) {
      prevHoveredEl.current.classList.remove("hover");
    }
    e.target.classList.add("hover");
    prevHoveredEl.current = e.target;
    dispatch(setHoverInnovationId(e.target.id));
  };

  React.useEffect(() => {
    const contentEls = document.querySelectorAll(
      ".innovation-contents__contents__item"
    );
    handleHover({ target: contentEls[0] });
    Array.prototype.forEach.call(contentEls, el => {
      el.addEventListener("mouseenter", handleHover);
      el.addEventListener("click", handleClick);
    });
    return () => {
      Array.prototype.forEach.call(contentEls, el => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("click", handleClick);
      });
    };
  }, []);

  return (
    <motion.div className={`innovation-contents`} {...props}>
      <div className={`innovation-contents__header`}>
        <h1>{innovationsContents.header}</h1>
        <Link handleClick={() => Router.push(`/about`)}>
          {innovationsContents.aboutLink}
        </Link>
      </div>
      <div className={`innovation-contents__contents`}>
        <Scrollbar vTrackStyle={{ left: 0, right: `unset` }}>
          {innovations.map(({ innovationname, uid, id }, i) => (
            // DON'T FORGET TO MAKE THE KEY UNIQUE !
            <motion.div
              key={id}
              id={uid}
              className={`innovation-contents__contents__item`}
              variants={{
                initial: { opacity: 0 },
                enter: { opacity: 1 },
                exit: { opacity: 0 }
              }}
            >
              <span>{i < 9 ? `0${i + 1}` : i + 1}</span>
              <h2>{innovationname}</h2>
            </motion.div>
          ))}
        </Scrollbar>
      </div>
    </motion.div>
  );
};

export default InnovationContents;
