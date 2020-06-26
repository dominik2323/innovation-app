import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { Player, ControlBar } from "video-react";
import InnovationUiPlaybtn from './InnovationUiPlaybtn';
import { useViewportDimensions } from '../hooks/useViewportDimensions';
import {
  toggleInnovationVideo,
  toggleSidebar,
  toggleNavbarDownload,
  toggleNavbarSearch,
} from '../store/actions';

import Player from '@vimeo/player';

const InnovationBgVideo = ({ vimeoId }) => {
  const ref = React.useRef(null);
  const dispatch = useDispatch();
  // const playInnovationVideo = useSelector(state => state.playInnovationVideo);

  const handlePlay = () => {
    dispatch(toggleSidebar(`hide`));
    dispatch(toggleNavbarSearch(false));
    dispatch(toggleNavbarDownload(false));
    dispatch(toggleInnovationVideo(true));
  };

  const handlePause = () => {
    dispatch(toggleInnovationVideo(false));
  };

  React.useEffect(() => {
    let options = {
      portrait: false,
      autoplay: true,
      muted: false,
    };
    const player = new Player(ref.current, options);
    player.on('play', handlePlay);
    // player.on("pause", handlePause);
    player.on('ended', handlePause);
    return () => {
      player.off('play', handlePlay);
      // player.off("pause", handlePause);
      player.off('ended', handlePause);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`innovation-bg__slideshow__video__vimeo`}
      data-vimeo-url={`https://player.vimeo.com/video/${vimeoId}`}
      style={{ height: `calc(${window.innerHeight}px - 60px)` }}
    />
  );
};

export default InnovationBgVideo;
