import * as React from 'react';
import clsx from 'clsx';
import { CardFaceFieldValues, CardPixels } from '@types';
import { Grid, InputAdornment, makeStyles, Theme, Typography } from '@material-ui/core';
import { PaperCard } from '../../atoms/PaperCard';
import { useField } from 'formik';
import { TextField } from '../TextField';
import { CircleButton } from '../../atoms/Buttons';
import { ImageButtonsInput } from './ImageButtonsInput';
import { ImageDisplay } from './ImageDisplay';
import { FlipCardFaceStyles } from '../../definitions';

export const useStyles = makeStyles((theme: Theme) => {
  const typographySizing = {
    [theme.breakpoints.only('xs')]: {
      ...theme.typography.body2,
      fontSize: '0.6rem',
    },
    [theme.breakpoints.up('sm')]: {
      ...theme.typography.body2,
    },
    [theme.breakpoints.up('md')]: {
      ...theme.typography.body2,
    },
    [theme.breakpoints.up('lg')]: {
      ...theme.typography.body1,
    },
    [theme.breakpoints.only('xl')]: {
      ...theme.typography.h6,
    },
  };

  return {
    ...FlipCardFaceStyles,
    numberText: {
      position: 'absolute',
      top: 0,
      left: 3,
      ...typographySizing,
    },
    sideText: {
      position: 'absolute',
      top: 0,
      left: '50%',
      width: 500,
      transform: 'translateX(-50%)',
      ...typographySizing,
    },
    evenSplitContainer: {
      height: '50%',
      width: '50%',
    },
    imagePasteFieldPosition: {
      margin: 'auto',
    },
    textFieldSizeOverride: {
      [theme.breakpoints.only('xs')]: {
        transform: 'scale(0.55)',
      },
    },
    textFieldInput: {
      textAlign: 'center',
      [theme.breakpoints.only('xs')]: {
        fontSize: '1.5em',
        padding: '0 0 1px 0',
      },
      [theme.breakpoints.only('sm')]: {
        fontSize: '1.2em',
        padding: '0 0 2px 0',
      },
      [theme.breakpoints.up('md')]: {
        fontSize: '1.3em',
        padding: '0 0 8px 0',
      },
      [theme.breakpoints.up('lg')]: {
        fontSize: '1.4em',
        padding: '0 0 8px 0',
      },
      [theme.breakpoints.up('xl')]: {
        fontSize: '1.5em',
        padding: '0 0 8px 0',
      },
    },
    pasteTextfield: {
      transform: 'translateY(-50%)',
      position: 'relative',
      top: '50%',
      [theme.breakpoints.up('md')]: {
        width: '65%',
        maxWidth: CardPixels.sm,
      },
      margin: 'auto',
    },
    backButton: {
      zIndex: 100,
      [theme.breakpoints.only('xs')]: {
        margin: '-40px -30px 0',
        transform: 'scale(0.6)',
        '&:hover': {
          transform: 'scale(0.7)',
        },
      },
      [theme.breakpoints.up('sm')]: {
        margin: '-60px -30px 0',
        transform: 'scale(0.7)',
        '&:hover': {
          transform: 'scale(0.8)',
        },
      },
      [theme.breakpoints.up('md')]: {
        margin: '-50px -30px 0',
        transform: 'scale(0.8)',
        '&:hover': {
          transform: 'scale(0.9)',
        },
      },
    },
  };
});

type CardFaceInputProps = {
  name: string;
  cardIndex: number;
  front?: boolean;
  back?: boolean;
};

export const CardFaceInput: React.FC<CardFaceInputProps> = ({ name, cardIndex, front = false }) => {
  const cs = useStyles();
  const [field, , helpers] = useField<CardFaceFieldValues>(name);
  const [showInput, setShowInput] = React.useState(false);
  const [imageSrcValid, setImageSrcValid] = React.useState(false);

  React.useEffect(() => {
    const tester = new Image();
    tester.onload = () => setImageSrcValid(true);
    tester.onerror = () => setImageSrcValid(false);
    tester.src = field.value.imgLink;
  }, [field.value.imgLink]);

  const showButtons = !imageSrcValid && !showInput;

  const revertImageInput = () => {
    setShowInput(false);
    setImageSrcValid(false);
    helpers.setValue({ ...field.value, imgLink: '' });
  };

  return (
    <Grid container className={cs.cardFace} component={PaperCard}>
      <Typography className={cs.numberText}>Card #{cardIndex + 1}</Typography>
      <Typography className={cs.sideText}>
        {front ? 'Frontside Display' : 'Backside Display'}
      </Typography>
      <Grid
        item
        xs={12}
        className={clsx({
          [cs.imageArea]: !!imageSrcValid,
          [cs.evenSplitContainer]: !imageSrcValid,
        })}
      >
        <Grid container style={{ border: !imageSrcValid && 'unset' }} className={cs.imageContainer}>
          {showButtons && (
            <>
              <ImageButtonsInput handleShowInput={() => setShowInput(true)} fieldName={name} />
            </>
          )}

          {showInput && !imageSrcValid && (
            <Grid item xs={12}>
              <div className={cs.pasteTextfield}>
                <TextField
                  label="&nbsp;Image Link"
                  fullWidth
                  focused
                  className={cs.imagePasteFieldPosition}
                  name={`${name}.imgLink`}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CircleButton
                          iconName="prev"
                          colour="dull"
                          size="small"
                          onClick={revertImageInput}
                          className={cs.backButton}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
            </Grid>
          )}

          {!!imageSrcValid && (
            <>
              <ImageDisplay handleRevertImage={revertImageInput} imgLink={field.value.imgLink} />
            </>
          )}
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        className={clsx({
          [cs.bottomContainer]: !!imageSrcValid,
          [cs.evenSplitContainer]: !imageSrcValid,
        })}
      >
        <div className={cs.bottomWrapper}>
          <TextField
            label="Card Text"
            name={`${name}.text`}
            inputProps={{ className: cs.textFieldInput }}
          />
        </div>
      </Grid>
    </Grid>
  );
};
