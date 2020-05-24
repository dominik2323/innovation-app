import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DataContext } from '../helpers/dataContext';
import { selectInnovationById } from '../helpers/selectInnovationById';
import {
  setCurrentSlideshowIndex,
  toggleNavbarSearch,
  toggleNavbarDownload,
  toggleInnovationVideo,
  toggleSidebar,
} from '../store/actions';
import { useKeyPress } from '../hooks/useKeyPress';

const InnovationUiSlider = () => {
  const { innovations } = React.useContext(DataContext);
  const dispatch = useDispatch();
  const changeSlideAction = changeSlide(dispatch);

  const activeInnovationId = useSelector((state) => state.activeInnovationId);
  const currentSlideshowIndex = useSelector(
    (state) => state.currentSlideshowIndex
  );

  const currentInnovation = selectInnovationById(
    innovations,
    activeInnovationId
  );
  const numOfInnovations = currentInnovation.slideshow.length;

  const handleIndexChange = (type) => {
    const direction = type === `DEC` ? -1 : 1;
    const nextPossibleIndex = currentSlideshowIndex + direction;
    if (nextPossibleIndex > numOfInnovations - 1) {
      changeSlideAction(currentSlideshowIndex);
    } else if (nextPossibleIndex < 0) {
      changeSlideAction(0);
    } else {
      changeSlideAction(nextPossibleIndex);
    }
  };

  const downArrow = useKeyPress('ArrowDown');
  const upArrow = useKeyPress('ArrowUp');

  React.useEffect(() => {
    if (downArrow) {
      handleIndexChange('INC');
    } else if (upArrow) {
      handleIndexChange('DEC');
    }
  }, [downArrow, upArrow]);

  const isNextSlideAvaible = currentSlideshowIndex === numOfInnovations - 1;
  const isPrevSlideAvaible = currentSlideshowIndex === 0;

  return (
    <div className={`innovation-ui__slider`}>
      <div
        onClick={() => handleIndexChange('DEC')}
        className={`
            innovation-ui__slider__arrow 
            innovation-ui__slider__arrow--up
            ${
              isPrevSlideAvaible ? `innovation-ui__slider__arrow--inactive` : ``
            } 
          `}
      />
      <div
        onClick={() => handleIndexChange('INC')}
        className={`
            innovation-ui__slider__arrow 
            innovation-ui__slider__arrow--down
            ${
              isNextSlideAvaible ? `innovation-ui__slider__arrow--inactive` : ``
            } 
          `}
      />
    </div>
  );
};

const changeSlide = (dispatch) => (index) => {
  dispatch(toggleNavbarSearch(false));
  dispatch(toggleNavbarDownload(false));
  dispatch(toggleInnovationVideo(false));
  dispatch(toggleSidebar(`hide`));
  dispatch(setCurrentSlideshowIndex(index));
};

export default InnovationUiSlider;
