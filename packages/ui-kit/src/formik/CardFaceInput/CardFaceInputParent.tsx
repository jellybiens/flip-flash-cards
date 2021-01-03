import * as React from 'react';
import clsx from 'clsx';
import { CardFaceFieldValues } from '@types';
import { Grid, InputAdornment, makeStyles, Theme, Typography, useTheme } from '@material-ui/core';
import { PaperCard } from '../../atoms/PaperCard';
import { useField } from 'formik';
import { TextField } from '../TextField';
import { CircleButton } from '../../atoms/Buttons';
import { ImageButtonsInput } from './ImageButtonsInput';
import { ImageDisplay } from './ImageDisplay';
import { FlipCardFaceStyles } from '../../definitions';
import { ColourPicker } from '../ColourPicker';
import { PaletteColor } from '@material-ui/core/styles/createPalette';

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

  const textFieldScaling = {
    [theme.breakpoints.only('sm')]: { transform: 'scale(0.9)' },
    [theme.breakpoints.only('md')]: { transform: 'scale(1.2)' },
    [theme.breakpoints.only('lg')]: { transform: 'scale(1.5)' },
    [theme.breakpoints.only('xl')]: { transform: 'scale(1.8)' },
  };

  return {
    ...FlipCardFaceStyles,
    numberText: {
      position: 'absolute',
      top: 0,
      left: 3,
      ...typographySizing,
    },
    colourPicker: {
      position: 'absolute',
      bottom: 3,
      right: 2,
      zIndex: 25,
    },
    evenSplitContainer: {
      height: '50%',
      width: '50%',
    },
    imageFieldContainer: {
      height: 'auto',
      width: 'auto',
      display: 'flex',
    },
    imageFieldWrapper: {
      margin: 'auto',
      [theme.breakpoints.only('xs')]: { transform: 'scale(0.8)' },
      ...textFieldScaling,
    },
    adornmentWrapper: {
      transform: 'scale(0.7) translate(-5px, -20px)',
      zIndex: 10,
    },
    cardTextInputWrapper: {
      transformOrigin: 'top',
      margin: '0 auto',
      [theme.breakpoints.only('xs')]: {
        transform: 'scale(0.8)',
        '& input': { padding: 0 },
        '& p': { margin: 0 },
      },
      ...textFieldScaling,
    },
    labelRoot: { [theme.breakpoints.only('xs')]: { top: -10 } },
    labelFocused: {
      [theme.breakpoints.only('xs')]: { top: 0 },
    },
    cardTextInput: {
      textAlign: 'center',
    },
    backButton: {
      zIndex: 100,
      margin: '-40px -30px 0',
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
  const { palette } = useTheme();

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
    <Grid
      container
      className={cs.cardFace}
      component={PaperCard}
      style={{
        backgroundColor: (palette[field.value.colour] as PaletteColor).main,
        color: (palette[field.value.colour] as PaletteColor).contrastText,
      }}
    >
      <div className={cs.colourPicker}>
        <ColourPicker name={`${name}.colour`} />
      </div>

      <Typography className={cs.numberText}>Card #{cardIndex + 1}</Typography>
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
            <Grid item xs={12} className={cs.imageFieldContainer}>
              <div className={cs.imageFieldWrapper}>
                <TextField
                  colour={field.value.colour}
                  label="&nbsp;Image Link"
                  fullWidth
                  focused
                  name={`${name}.imgLink`}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" className={cs.adornmentWrapper}>
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
        <div className={clsx(cs.bottomWrapper, cs.cardTextInputWrapper)}>
          <TextField
            colour={field.value.colour}
            label={front ? 'Frontside Clue Text' : 'Backside Answer Text'}
            name={`${name}.text`}
            inputProps={{ className: cs.cardTextInput }}
            InputLabelProps={{
              classes: { root: cs.labelRoot, shrink: cs.labelFocused, focused: cs.labelFocused },
            }}
          />
        </div>
      </Grid>
    </Grid>
  );
};
