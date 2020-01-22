import React from 'react';
import { useDispatch } from 'react-redux';
import Router from 'next/router';

import Img from './Img';
import IntroNumber from './IntroNumber';
import IntroContent from './IntroContent';
import IntroBg from './IntroBg';
import Button from './Button';

import { DataContext } from '../helpers/dataContext';
import { setCurrentSlideshowIndex } from '../store/actions';

const Intro = ({ setScreen, ...props }) => {
  const dispatch = useDispatch();
  const { components, innovations } = React.useContext(DataContext);
  const [playIntro, toggleIntro] = React.useState(true);

  const { loopSrc, header, posterSrc } = components.intro;
  const { discover, about } = components.button;
  return (
    <div className={`intro`}>
      <IntroNumber number={innovations.length} />
      <IntroContent>
        <h1>{header.toUpperCase()}</h1>
        <Button
          handleClick={() => {
            toggleIntro(false);
            dispatch(setCurrentSlideshowIndex(0));
            Router.push(`/[lang]/innovations`, `/cs/innovations`);
          }}
          className={`btn__primary`}
        >
          {discover}
        </Button>
        <Button
          handleClick={() => {
            toggleIntro(false);
            Router.push('/about');
          }}
          className={`btn__secondary intro__content__about-btn`}
        >
          {about}
        </Button>
      </IntroContent>
      <IntroBg
        togglePlay={playIntro}
        path={`/static/img/components/${loopSrc}`}
        poster={`/static/img/components/${posterSrc}`}
      />
    </div>
  );
};

export default Intro;
