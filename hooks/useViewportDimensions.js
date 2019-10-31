import React from 'react';

export function useViewportDimensions() {
  const [dimensions, setDimensions] = React.useState({
    w: 0,
    h: 0
  });

  const handleResize = () => {
    setDimensions({
      w: window.innerWidth,
      h: window.innerHeight
    });
  };

  React.useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return dimensions;
}
