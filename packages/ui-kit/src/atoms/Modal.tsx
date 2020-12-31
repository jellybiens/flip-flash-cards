import * as React from 'react';
import { makeStyles, Theme, Dialog as MuiDialog } from '@material-ui/core';
import { PaperCard } from './PaperCard';

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      overflow: 'hidden',
    },
    body: {
      height: 'calc(80vh - 4px)',
      width: 'calc(80vw - 4px)',
      overflow: 'hidden',
      borderRadius: 5,
      borderStyle: 'groove inset',
      borderWidth: 2,
      borderColor: theme.palette.dull.light,
    },
    override: { maxHeight: 'unset', maxWidth: 'unset' },
  };
});

type ModalProps = {
  open: boolean;
  onClose?: () => void;
};

export const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  const cs = useStyles();

  return (
    <MuiDialog
      className={cs.root}
      classes={{
        paperWidthXs: cs.override,
        paperWidthSm: cs.override,
        paperWidthMd: cs.override,
        paperWidthLg: cs.override,
        paperWidthXl: cs.override,
      }}
      open={open}
      onClose={onClose}
      disableEscapeKeyDown
      disableBackdropClick
    >
      <PaperCard className={cs.body}>{children}</PaperCard>
    </MuiDialog>
  );
};
