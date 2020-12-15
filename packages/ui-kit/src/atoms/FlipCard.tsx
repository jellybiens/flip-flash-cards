import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { FlipCardInner, FlipCardInnerProps, FlipCardSizing } from './FlipCardInner';

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      margin: 'auto',
      display: 'flex',
      padding: theme.spacing(1),
      ...FlipCardSizing(theme),
    },
  };
});

export type FlipCardProps = Omit<FlipCardInnerProps, 'rotate' | 'setRotate'>;

export const FlipCard: React.FC<FlipCardProps> = ({ ...props }) => {
  const cs = useStyles();
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

  return (
    <div className={cs.root}>
      <FlipCardInner {...props} rotate={rotate} setRotate={() => setRotate(!rotate)} />
    </div>
  );
};
