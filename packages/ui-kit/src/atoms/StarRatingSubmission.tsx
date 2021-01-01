import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      height: 'auto',
      width: 'fit-content',
      [theme.breakpoints.only('xs')]: { ...theme.typography.h5 },
      [theme.breakpoints.only('sm')]: { ...theme.typography.h4 },
      [theme.breakpoints.up('md')]: { ...theme.typography.h3 },
      [theme.breakpoints.up('lg')]: { ...theme.typography.h2 },
    },
  };
});

type StarRatingSubmissionProps = {
  handleSubmitRating: (i) => void;
};

export const StarRatingSubmission: React.FC<StarRatingSubmissionProps> = ({
  handleSubmitRating,
}) => {
  const cs = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <Rating
      className={cs.root}
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        handleSubmitRating(newValue);
      }}
    />
  );
};
