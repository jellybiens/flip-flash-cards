import { makeStyles, Theme } from '@material-ui/core';
import { FlipCardFaceStyles } from '../../definitions';

export const useStyles = makeStyles((theme: Theme) => {
  return {
    ...FlipCardFaceStyles,
    sideText: {
      position: 'absolute',
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
    },
    evenSplitContainer: {
      height: '50%',
      width: '50%',
    },
    textFieldContainer: {
      transform: 'translateY(-50%)',
      position: 'relative',
    },
    textField: {
      top: '50%',
    },
    textFieldInput: {
      textAlign: 'center',
      [theme.breakpoints.only('xs')]: {
        fontSize: '1em',
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.5em',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '2.25em',
      },
      [theme.breakpoints.only('xl')]: {
        fontSize: '3em',
      },
    },
    buttons: {
      [theme.breakpoints.up('xs')]: {
        transform: 'translateY(-50%)',
      },
      [theme.breakpoints.up('sm')]: {
        transform: 'translateY(-25%)',
      },
      [theme.breakpoints.only('sm')]: {
        '& button': { fontSize: '0.65em', whiteSpace: 'nowrap' },
      },
      [theme.breakpoints.up('lg')]: {
        transform: 'translateY(50%) scale(1.5)',
      },
      position: 'relative',
      top: '50%',
      width: '80%',
      maxWidth: 180,
      margin: 'auto',
    },
    pasteTextfield: {
      [theme.breakpoints.only('xs')]: {
        fontSize: '1em',
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.5em',
      },
      [theme.breakpoints.up('lg')]: {
        width: '60%',
      },
      transform: 'translateY(-50%)',
      position: 'relative',
      top: '50%',
      width: '80%',
      margin: 'auto',
    },
    backButton: { margin: '-50px -30px 0', transform: 'scale(0.6)', zIndex: 100 },
    binButton: { position: 'absolute', top: 5, right: 5 },
  };
});
