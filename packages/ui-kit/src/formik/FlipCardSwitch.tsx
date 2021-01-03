import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core';
import { CardPixels } from '@types';
import { CARD_WIDTH as WIDTH, FlipCardWrapper } from '../atoms/FlipCardWrapper';
import { CardFace } from '../atoms/CardFace';

const useStyles = makeStyles((theme: Theme) => {
  return {
    backInset: {
      borderStyle: 'groove inset',
      position: 'relative',
      margin: 'auto',
      boxShadow: `grey inset 0px 3px 3px;`,
      [theme.breakpoints.down('xs')]: {
        height: CardPixels.xs / 8,
        width: (CardPixels.xs + WIDTH) / 2,
      },
      [theme.breakpoints.down('sm')]: {
        height: CardPixels.sm / 8,
        width: (CardPixels.sm + WIDTH) / 2,
      },
      [theme.breakpoints.up('md')]: {
        height: CardPixels.md / 8,
        width: (CardPixels.md + WIDTH) / 2,
      },
      [theme.breakpoints.up('lg')]: {
        height: CardPixels.lg / 4,
        width: (CardPixels.lg + WIDTH) / 2,
      },
      [theme.breakpoints.up('xl')]: {
        height: CardPixels.xl / 4 + 1,
        width: (CardPixels.xl + WIDTH) / 2,
      },
    },

    switchContainer: {
      height: '100%',
      width: '100%',
      position: 'absolute',
      transition: 'transform 0.5s',
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
    override: {
      height: '100% !important',
      width: '100% !important',
    },
  };
});
//TODO: translations learn test challenge
const frontsideText = 'Learn';
const backsideText = 'Test';

export const FlipCardSwitch: React.FC = () => {
  const cs = useStyles();
  const [toggle, setToggle] = React.useState(false);

  return (
    <div className={cs.backInset} onClick={() => setToggle(!toggle)}>
      <div className={clsx(cs.switchContainer, { [cs.switchToggle]: toggle })}>
        <div className={cs.cardContainer}>
          <FlipCardWrapper className={cs.override}>
            <CardFace text={frontsideText} />
            <CardFace text={backsideText} />
          </FlipCardWrapper>
        </div>
      </div>
    </div>
  );
};
