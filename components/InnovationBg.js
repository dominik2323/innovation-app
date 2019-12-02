import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Player } from "video-react";

import { DataContext } from "../helpers/dataContext";
import Img from "./Img";
import { selectInnovationById } from "../helpers/functions";
import InnovationBgVideo from "./InnovationBgVideo";
import InnovationUiPlaybtn from "./InnovationUiPlaybtn";

const InnovationBg = ({ ...props }) => {
  const { innovations } = React.useContext(DataContext);
  const ref = React.useRef(null);

  const {
    activeInnovationId,
    hoverInnovationId,
    currentSlideshowIndex,
    playInnovationVideo
  } = useSelector(state => state);

  const activeId =
    activeInnovationId.length !== 0 ? activeInnovationId : hoverInnovationId;

  const { slideshow, id, vimeoid } = selectInnovationById(
    innovations,
    activeId
  );

  return (
    <motion.div
      id={`innovation-bg`}
      className={`innovation-bg`}
      ref={ref}
      {...props}
    >
      {activeInnovationId.length !== 0 ? (
        <motion.div
          className={`innovation-bg__slideshow`}
          initial={false}
          animate={{
            y: `calc((100vh - 60px) * ${currentSlideshowIndex * -1})`
          }}
          transition={{ mass: 1 }}
        >
          {slideshow.map((slide, i) => {
            if (slide.vimeoid !== null) {
              return (
                <div
                  key={slide.img.url}
                  className={`innovation-bg__slideshow__video`}
                >
                  {!playInnovationVideo && [
                    <InnovationUiPlaybtn />,
                    <Img src={slide.img.url} />
                  ]}
                  {playInnovationVideo && (
                    <InnovationBgVideo vimeoId={slide.vimeoid} />
                  )}
                </div>
              );
            } else {
              return <Img key={i} src={slide.img.url} />;
            }
          })}
        </motion.div>
      ) : (
        <Img src={slideshow[0].img.url} key={slideshow[0].img.url} />
      )}
    </motion.div>
  );
};

export default InnovationBg;
