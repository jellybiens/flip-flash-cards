import * as React from 'react';
import { makeStyles, Theme, LinearProgress, Typography } from '@material-ui/core';
import { FlipCardSizing } from '../definitions';

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      width: '100%',
      display: 'flex',
    },
    container: {
      display: 'flex',
      margin: 'auto',
      width: 'auto',
    },
    wrapperLoading: {
      ...FlipCardSizing(theme),
      height: '100% !important',
      margin: 'auto 10px auto 0px',
    },
    wrapperText: {
      whiteSpace: 'pre-wrap',
      width: 50,
      float: 'right',
    },
  };
});

type LoadingBarProps = {
  handleLoaded: () => void;
};

const T = 3 * 10;

export const LoadingBar: React.FC<LoadingBarProps> = ({ handleLoaded }) => {
  const cs = useStyles();

  const [progress, setProgress] = React.useState(0);
  const [progressText, setProgressText] = React.useState(0);
  const [tickLength, setTickLength] = React.useState(Math.round(Math.random() * 750) - 375);

  React.useEffect(() => {
    if (progress % 10 === 0) {
      setTickLength(Math.round(Math.random() * 75) - 25);
    }

    const D = T + tickLength;
    if (progress === 100) {
      handleLoaded();
    } else {
      setTimeout(() => setProgress(progress + 1), D);
      setTimeout(() => setProgressText(progress + 1), D + 400);
    }
  }, [progress]);

  return (
    <div className={cs.root}>
      <div className={cs.container}>
        <div className={cs.wrapperLoading}>
          <LinearProgress variant="determinate" value={progress} />
        </div>
        <div className={cs.wrapperText}>
          <Typography variant="body2">{`${progressText}%`.padStart(4, '  ')}</Typography>
        </div>
      </div>
    </div>
  );
};
