import React from 'react';

export function useViewportDimensions() {
  const [dimensions, setDimensions] = React.useState({
    w: 0,
    h: 0,
  });

  const handleResize = () => {
    // prevent to update dimensions when user enters fullscreen mode
    // document.fullscreenElement value is null or element
    if (
      !(
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement
      )
    ) {
      setDimensions({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    }
  };

  React.useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
}
