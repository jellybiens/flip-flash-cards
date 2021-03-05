import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { Typography } from './Typography';
import { useViewportSize } from '../helpers';

const useStyles = makeStyles(() => {
  return {
    root: {
      height: 'auto',
      display: 'flex',
      width: 'fit-content',
      filter: `drop-shadow(1px 1px 0 black) 
        drop-shadow(-0.5px 1px 0 black) 
        drop-shadow(1px -0.5px 0 black) 
        drop-shadow(-0.5px -0.5px 0 black)
        drop-shadow(-0.5px 0px 0 black) 
        drop-shadow(0px 1px 0 black) 
        drop-shadow(1px 0px 0 black) 
        drop-shadow(0px -0.5px 0 black)`,
    },
    wrapper: {
      height: 'fit-content',
      width: 'fit-content',
    },
    icon: {
      filter: `drop-shadow(1px 1px 0 white) 
        drop-shadow(-0.5px 1px 0 white) 
        drop-shadow(1px -0.5px 0 white) 
        drop-shadow(-0.5px -0.5px 0 white)
        drop-shadow(-0.5px 0px 0 white) 
        drop-shadow(0px 1px 0 white) 
        drop-shadow(1px 0px 0 white) 
        drop-shadow(0px -0.5px 0 white)`,
    },
    stars: {
      margin: 'auto',
    },
    votes: {
      margin: 'auto',
      color: 'black',
      filter: `drop-shadow(1px 1px 0 white) 
        drop-shadow(-0.5px 1px 0 white) 
        drop-shadow(1px -0.5px 0 white) 
        drop-shadow(-0.5px -0.5px 0 white)
        drop-shadow(-0.5px 0px 0 white) 
        drop-shadow(0px 1px 0 white) 
        drop-shadow(1px 0px 0 white) 
        drop-shadow(0px -0.5px 0 white)`,
    },
  };
});

export type StarRatingTotalProps = {
  avgRating: number;
  totalVotes: number;
};

export const StarRatingTotal: React.FC<StarRatingTotalProps> = ({
  avgRating,
  totalVotes,
}) => {
  const cs = useStyles();

  const vps = useViewportSize();
  const size =
    vps === 'xs' ? 'small' : vps === 'sm' ? 'small' : vps === 'md' ? 'medium' : 'large';

  const containerRef = React.useRef<HTMLDivElement>();
  const [fontHeight, setFontHeight] = React.useState(0);

  React.useLayoutEffect(() => {
    setFontHeight(containerRef?.current?.offsetHeight * 0.8);
  });

  return (
    <div className={cs.root}>
      <div className={cs.wrapper} ref={containerRef}>
        <Rating
          classes={{ icon: cs.icon }}
          className={cs.stars}
          value={avgRating}
          readOnly
          precision={0.5}
          size={size}
        />
      </div>
      <Typography variant="body1" className={cs.votes} style={{ fontSize: fontHeight }}>
        ({totalVotes})
      </Typography>
    </div>
  );
};
