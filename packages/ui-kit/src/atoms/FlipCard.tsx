import * as React from 'react';
import { FlipCardInner, FlipCardInnerProps } from './FlipCardInner';

export type FlipCardProps = Omit<FlipCardInnerProps, 'rotate' | 'setRotate'>;

export const FlipCard: React.FC<FlipCardProps> = ({ ...props }) => {
  const [rotate, setRotate] = React.useState(false);

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === ' ') {
      setRotate(!rotate);
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [rotate]);

  return <FlipCardInner {...props} rotate={rotate} setRotate={() => setRotate(!rotate)} />;
};
