import * as React from 'react';
import { makeStyles, TypographyVariant } from '@material-ui/core';
import { Rating } from '@material-ui/lab';
import { Typography } from './Typography';

const useStyles = makeStyles(() => {
  return {
    root: {
      height: 'auto',
      width: 'fit-content',
      display: 'flex',
    },
    stars: {
      margin: 'auto',
    },
    votes: {
      height: 'min-content',
      margin: 'auto',
    },
  };
});

type StarRatingTotalProps = {
  avgRating: number;
  totalVotes: number;
  size?: 'small' | 'medium' | 'large';
};

export const StarRatingTotal: React.FC<StarRatingTotalProps> = ({
  avgRating,
  totalVotes,
  size = 'medium',
}) => {
  const cs = useStyles();

  const variant: TypographyVariant =
    size === 'small' ? 'caption' : size === 'medium' ? 'body2' : 'body1';

  return (
    <div className={cs.root}>
      <Rating
        className={cs.stars}
        value={avgRating}
        readOnly
        precision={0.5}
        size={size}
      />
      <Typography variant={variant} className={cs.votes}>
        ({totalVotes})
      </Typography>
    </div>
  );
};
//TODO: font sizes need to be smaller per
