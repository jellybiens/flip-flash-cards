import * as React from 'react';
import clsx from 'clsx';
import { CardFaceFieldValues } from '@types';
import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { PaperCard } from '../atoms/PaperCard';
import { FastField, useField } from 'formik';
import { TextField } from './TextField';
import { FlipCardColours, FlipCardFaceStyles } from '../definitions';
import { ColourPicker } from './ColourPicker';
import { ImageCropperField } from './ImageCropperField';
import { SquareButton } from '../atoms/Buttons';

export const useStyles = makeStyles((theme: Theme) => {
  const typographySizing = {
    [theme.breakpoints.only('xs')]: {
      ...theme.typography.body2,
      fontSize: '0.6rem',
    },
    [theme.breakpoints.only('sm')]: {
      ...theme.typography.body2,
    },
  };

  const textFieldScaling = {
    [theme.breakpoints.only('sm')]: { transform: 'scale(0.9)' },
    [theme.breakpoints.only('md')]: { transform: 'scale(1.2)' },
    [theme.breakpoints.only('lg')]: { transform: 'scale(1.5)' },
    [theme.breakpoints.only('xl')]: { transform: 'scale(1.8)' },
  };

  return {
    ...FlipCardColours(theme),
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
  };
});

type CardFaceInputProps = {
  name: string;
  cardIndex: number;
  front?: boolean;
  back?: boolean;
};

export const CardFaceInput: React.FC<CardFaceInputProps> = ({
  name,
  cardIndex,
  front = false,
}) => {
  const cs = useStyles();
  const [field] = useField<CardFaceFieldValues>(name);
  const [addImage, setAddImage] = React.useState(false);
  const [px, setPx] = React.useState(150);
  const CropperParent = React.useRef<HTMLDivElement>();
  React.useEffect(() => {
    if (CropperParent?.current) setPx(CropperParent?.current.offsetWidth * 0.62);
  }, [CropperParent]);

  return (
    <Grid
      container
      className={clsx(cs[`${field.value.colour}Card`], cs.cardFace)}
      component={PaperCard}
    >
      <div className={cs.colourPicker}>
        <ColourPicker name={`${name}.colour`} />
      </div>

      <Typography variant="subtitle1" className={cs.numberText}>
        Card #{cardIndex + 1}
      </Typography>
      <Grid
        item
        xs={12}
        className={clsx({
          [cs.imageArea]: !!addImage,
          [cs.evenSplitContainer]: !addImage,
        })}
        ref={CropperParent}
      >
        {!addImage && (
          <SquareButton colour="cyan" onClick={() => setAddImage(true)}>
            Add Image
          </SquareButton>
        )}
        {!!addImage && <ImageCropperField px={px} name={`${name}.imageCropArgs`} />}
      </Grid>

      <Grid
        item
        xs={12}
        className={clsx({
          [cs.bottomContainer]: !!addImage,
          [cs.evenSplitContainer]: !addImage,
        })}
      >
        <div className={clsx(cs.bottomWrapper, cs.cardTextInputWrapper)}>
          <FastField name={`${name}.text`}>
            {() => (
              <TextField
                fullWidth
                colour={field.value.colour}
                label={front ? 'Frontside Clue Text' : 'Backside Answer Text'}
                inputProps={{ className: cs.cardTextInput }}
                InputLabelProps={{
                  classes: {
                    root: cs.labelRoot,
                    shrink: cs.labelFocused,
                    focused: cs.labelFocused,
                  },
                }}
              />
            )}
          </FastField>
        </div>
      </Grid>
    </Grid>
  );
};
