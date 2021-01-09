import * as React from 'react';
import { fade, makeStyles, Theme } from '@material-ui/core';
import { PaperCard } from './PaperCard';

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
      height: '80vh',
      width: '80vw',
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
