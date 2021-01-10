import * as React from 'react';
import { fade, makeStyles, Theme } from '@material-ui/core';
import { CardPixels } from '@types';

const useStyles = makeStyles((theme: Theme) => {
  return {
    backing: {
      zIndex: 10000,
      position: 'fixed',
      right: 0,
      top: 0,
      backgroundColor: fade(theme.palette.dull.dark, 0.5),
      height: '100vh',
      width: '100vw',
    },
    body: {
      animation: '$remove ease 0.5s',
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      [theme.breakpoints.only('xs')]: {
        height: `calc(${CardPixels.xs}px * 1.3)`,
        width: `calc(${CardPixels.xs}px * 1.2)`,
      },
      [theme.breakpoints.only('sm')]: {
        height: `calc(${CardPixels.sm}px * 1.3)`,
        width: `calc(${CardPixels.sm}px * 1.2)`,
      },
      [theme.breakpoints.only('md')]: {
        height: `calc(${CardPixels.md}px * 1.3)`,
        width: `calc(${CardPixels.md}px * 1.2)`,
      },
      [theme.breakpoints.only('lg')]: {
        height: `calc(${CardPixels.lg}px * 1.3)`,
        width: `calc(${CardPixels.lg}px * 1.2)`,
      },
      [theme.breakpoints.only('xl')]: {
        height: `calc(${CardPixels.xl}px * 1.3)`,
        width: `calc(${CardPixels.xl}px * 1.2)`,
      },
    },

    '@keyframes remove': {
      '0%': { opacity: 0, transform: 'translate(-50%, -30%)' },
      '100%': { opacity: 1, transform: 'translate(-50%, -50%)' },
    },
  };
});

export type ModalProps = {
  open: boolean;
  onClose?: () => void;
};

export const Modal: React.FC<ModalProps> = ({ open, children }) => {
  const cs = useStyles();

  if (!open) return <></>;

  return (
    <div className={cs.backing}>
      <div className={cs.body}>{children}</div>
    </div>
  );
};
