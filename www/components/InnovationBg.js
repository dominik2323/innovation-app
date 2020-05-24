import React from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { useGesture } from 'react-use-gesture';

import { DataContext } from '../helpers/dataContext';
import Img from './Img';
import { selectInnovationById } from '../helpers/selectInnovationById';
import InnovationBgVideo from './InnovationBgVideo';
import InnovationUiPlaybtn from './InnovationUiPlaybtn';

import {
  setCurrentSlideshowIndex,
  toggleNavbarSearch,
  toggleNavbarDownload,
  toggleInnovationVideo,
  toggleSidebar,
} from '../store/actions';

const InnovationBg = ({ ...props }) => {
  const { innovations } = React.useContext(DataContext);
  const dispatch = useDispatch();
  const ref = React.useRef(null);
  const {
    activeInnovationId,
    hoverInnovationId,
    currentSlideshowIndex,
    playInnovationVideo,
  } = useSelector((state) => state);
  const currentInnovation = selectInnovationById(
    innovations,
    activeInnovationId
  );
  const changeSlideAction = changeSlide(dispatch);
  const numOfInnovations = currentInnovation.slideshow.length;

  const handleSlideChange = (directionY) => {
    const normalDirection = directionY < 0 ? 1 : -1;
    const nextPossibleIndex = currentSlideshowIndex + normalDirection;

    if (nextPossibleIndex > numOfInnovations - 1) {
      changeSlideAction(currentSlideshowIndex);
    } else if (nextPossibleIndex < 0) {
      changeSlideAction(1);
    } else {
      changeSlideAction(nextPossibleIndex);
    }
  };

  const bind = useGesture({
    onWheelStart: (e) => handleSlideChange(-1 * e.direction[1]),
    onDragEnd: (e) => e.movement[0] !== 0 && handleSlideChange(e.direction[1]),
  });

  const activeId =
    activeInnovationId.length !== 0 ? activeInnovationId : hoverInnovationId;

  const { slideshow, introimage } = selectInnovationById(innovations, activeId);

  return (
    <motion.div
      id={`innovation-bg`}
      className={`innovation-bg`}
      ref={ref}
      {...bind()}
      {...props}
    >
      {activeInnovationId.length !== 0 ? (
        <motion.div
          className={`innovation-bg__slideshow`}
          initial={false}
          animate={{
            y: (window.innerHeight - 60) * currentSlideshowIndex * -1,
          }}
          transition={{ mass: 1 }}
        >
          {slideshow.map((slide, i) => {
            if (slide.vimeoid !== null) {
              return (
                <div
                  key={i}
                  className={`innovation-bg__slideshow__video`}
                  style={{ height: `calc(${window.innerHeight}px - 60px)` }}
                >
                  {!playInnovationVideo && (
                    <React.Fragment>
                      <InnovationUiPlaybtn />
                      <Img src={slide.img.url} />
                    </React.Fragment>
                  )}
                  {playInnovationVideo && (
                    <InnovationBgVideo vimeoId={slide.vimeoid} />
                  )}
                </div>
              );
            } else {
              return (
                <div
                  className={`innovation-bg__slideshow__image`}
                  key={i}
                  style={{ height: `calc(${window.innerHeight}px - 60px)` }}
                >
                  <Img src={slide.img.url} />
                </div>
              );
            }
          })}
        </motion.div>
      ) : (
        <Img
          src={
            Object.keys(introimage).length !== 0
              ? introimage.url
              : slideshow[0].img.url
          }
          key={slideshow[0].img.url}
        />
      )}
    </motion.div>
  );
};

const changeSlide = (dispatch) => (index) => {
  dispatch(toggleNavbarSearch(false));
  dispatch(toggleNavbarDownload(false));
  dispatch(toggleInnovationVideo(false));
  dispatch(toggleSidebar(`hide`));
  dispatch(setCurrentSlideshowIndex(index));
};

export default InnovationBg;
