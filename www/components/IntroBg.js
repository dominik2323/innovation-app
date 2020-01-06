import React from 'react';
import Img from './Img';

const IntroBg = ({ path, poster, togglePlay }) => {
  const ref = React.useRef(null);

  // React.useEffect(() => {
  //   if (togglePlay) {
  //     ref.current.play();
  //   } else {
  //     ref.current.pause();
  //   }
  // }, [togglePlay]);

  return (
    <div className={`intro__bg`}>
      <video
        loop={true}
        autoPlay={true}
        muted={true}
        playsInline={true}
        src={path}
        poster={poster}
        // ref={ref}
      />
    </div>
  );
};

export default IntroBg;
