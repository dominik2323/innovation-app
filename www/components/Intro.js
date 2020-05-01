import React from 'react';
import { useDispatch } from 'react-redux';
import Router, { useRouter } from 'next/router';

import Img from './Img';
import IntroNumber from './IntroNumber';
import IntroContent from './IntroContent';
import IntroBg from './IntroBg';
import Button from './Button';

import { DataContext } from '../helpers/dataContext';
import { setCurrentSlideshowIndex } from '../store/actions';

const Intro = ({ setScreen, ...props }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { components, innovations } = React.useContext(DataContext);
  const [playIntro, toggleIntro] = React.useState(true);

  const { buttonDiscover, bestInnovations, buttonAbout } = components;
  return (
    <div className={`intro`}>
      <IntroNumber number={innovations.length} />
      <IntroContent>
        <h1>{bestInnovations.toUpperCase()}</h1>
        <Button
          handleClick={() => {
            toggleIntro(false);
            dispatch(setCurrentSlideshowIndex(0));
            Router.push(
              `/[lang]/innovations`,
              `/${router.query.lang}/innovations`
            );
          }}
          className={`btn__primary`}
        >
          {buttonDiscover}
        </Button>
        <Button
          handleClick={() => {
            toggleIntro(false);
            Router.push(`/[lang]/about`, `/${router.query.lang}/about`);
          }}
          className={`btn__secondary intro__content__about-btn`}
        >
          {buttonAbout}
        </Button>
      </IntroContent>
      <IntroBg togglePlay={playIntro} />
    </div>
  );
};

export default Intro;
