import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import { CardSize, CardPixels } from '@types';
import { CARD_WIDTH as WIDTH, FlipCardInner } from './FlipCardInner';

const cardInnerProps = {
  frontside: { text: 'Learn', imgLink: undefined },
  backside: { text: 'Test', imgLink: undefined },
};

const useStyles = makeStyles(() => {
  return {
    backInset: {
      borderStyle: 'groove inset',
      borderRadius: 5,
      position: 'relative',
      margin: 'auto',
      boxShadow: `grey inset 0px 6px 7px;`,
      backgroundColor: 'rgb(0,0,0,0)',
    },
    smBackInset: { height: CardPixels.sm / 2 + 1, width: CardPixels.sm + 2 + WIDTH / 2 },
    mdBackInset: { height: CardPixels.md / 2 + 1, width: CardPixels.md + 2 + WIDTH / 2 },
    lgBackInset: { height: CardPixels.lg / 2 + 1, width: CardPixels.lg + 2 + WIDTH / 2 },

    switchContainer: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      transition: 'transform 0.8s',
      transformStyle: 'preserve-3d',
    },
    switchToggle: {
      transform: `rotateY(180deg)`,
    },
    cardContainer: {
      position: 'absolute',
      height: '100%',
      width: '50%',
    },
  };
});

export type FlipCardProps = {
  size?: CardSize;
};

export const FlipCardSwitch: React.FC<FlipCardProps> = ({ size = 'md' }) => {
  const cs = useStyles();
  const [toggle, setToggle] = React.useState(false);

  return (
    <div className={clsx(cs.backInset, cs[`${size}BackInset`])} onClick={() => setToggle(!toggle)}>
      <div className={clsx(cs.switchContainer, { [cs.switchToggle]: toggle })}>
        <div className={cs.cardContainer}>
          <FlipCardInner {...cardInnerProps} size={size} />
        </div>
      </div>
    </div>
  );
};
