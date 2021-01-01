import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      height: 'auto',
      width: 'fit-content',
      display: 'flex',
    },
    stars: {
      margin: 'auto',
    },
    small: {
      height: 'min-content',
      margin: 'auto',
      ...theme.typography.body2,
      fontSize: '0.5em',
    },
    medium: {
      height: 'min-content',
      margin: 'auto',
      ...theme.typography.body2,
      fontSize: '0.7em',
    },
    large: {
      height: 'min-content',
      margin: 'auto',
      ...theme.typography.body2,
      fontSize: '0.9em',
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

  return (
    <div className={cs.root}>
      <Rating className={cs.stars} value={avgRating} readOnly precision={0.5} size={size} />
      <div className={cs[size]}>({totalVotes})</div>
    </div>
  );
};
