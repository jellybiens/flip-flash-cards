import * as React from 'react';

export type HeightWidth = {
  width: number;
  height: number;
};

export function useWindowSize(): HeightWidth {
  const [windowSize, setWindowSize] = React.useState<HeightWidth>({
    width: undefined,
    height: undefined,
  });

  React.useEffect(() => {
    const handleResize = () =>
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
