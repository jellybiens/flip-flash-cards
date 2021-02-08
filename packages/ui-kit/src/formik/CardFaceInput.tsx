import * as React from 'react';
import clsx from 'clsx';
import { CardFaceFieldValues } from '@types';
import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { PaperCard } from '../atoms/PaperCard';
import { FastField, FieldInputProps, useField } from 'formik';
import { TextField, TextFieldProps } from './TextField';
import { FlipCardColours, FlipCardFaceStyles } from '../definitions';
import { ColourPicker } from './ColourPicker';
import { ImageCropperField } from './ImageCropperField';
import { SquareButton, CircleButton } from '../atoms/Buttons';

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
      bottom: 0,
      left: 1,
      ...typographySizing,
    },
    colourPicker: {
      position: 'absolute',
      top: 3,
      right: 2,
      zIndex: 25,
    },
    backButton: {
      position: 'absolute',
      top: 0,
      left: 0,
      zIndex: 25,
      [theme.breakpoints.only('xs')]: { transform: 'scale(0.45)', top: -5.5, left: -8 },
      [theme.breakpoints.only('sm')]: { transform: 'scale(0.65)', top: -4, left: -5 },
      [theme.breakpoints.only('md')]: { transform: 'scale(0.85)' },
      [theme.breakpoints.only('lg')]: { top: 2, left: 2 },
      [theme.breakpoints.only('xl')]: { top: 4, left: 4 },
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
  const [field, , helpers] = useField<CardFaceFieldValues>(name);
  const [cardFaceView, setCardFaceView] = React.useState<
    'menu' | 'text' | 'image' | 'both'
  >('menu');

  const revertFaceValues = () => {
    helpers.setValue({
      text: '',
      imageCropArgs: {
        image: null,
        position: { x: 0, y: 0 },
        scale: { height: 300, width: 300 },
        px: 300,
      },
      imgFile: null,
      colour: 'white',
    });
    setCardFaceView('menu');
  };

  return (
    <PaperCard className={clsx(cs[`${field.value.colour}Card`], cs.cardFace)}>
      <div className={cs.backButton}>
        <CircleButton iconName="prev" colour="blue" onClick={revertFaceValues} />
      </div>

      <Typography variant="subtitle1" className={cs.numberText}>
        Card #{cardIndex + 1}
      </Typography>

      <div className={cs.colourPicker}>
        <ColourPicker name={`${name}.colour`} />
      </div>

      <div style={{ height: '100%', width: '100%' }}>
        <Grid container style={{ height: '100%', width: '100%', padding: '8%' }}>
          {cardFaceView === 'menu' && (
            <Grid item xs={12} container spacing={0}>
              <Grid item xs={12} style={{ margin: 'auto' }}>
                <SquareButton
                  style={{ height: '80%' }}
                  fullWidth
                  colour="green"
                  onClick={() => setCardFaceView('text')}
                >
                  Text Only
                </SquareButton>
              </Grid>
              <Grid item xs={12} style={{ margin: 'auto' }}>
                <SquareButton
                  style={{ height: '80%' }} //TODO: button heights and font sizes
                  fullWidth
                  colour="cyan"
                  onClick={() => setCardFaceView('image')}
                >
                  Image Only
                </SquareButton>
              </Grid>
              <Grid item xs={12} style={{ margin: 'auto' }}>
                <SquareButton
                  style={{ height: '80%' }}
                  fullWidth
                  colour="turquoise"
                  onClick={() => setCardFaceView('both')}
                >
                  Text and Image
                </SquareButton>
              </Grid>
            </Grid>
          )}

          {cardFaceView === 'text' && (
            <TextCardFace name={name} field={field} front={front} />
          )}

          {cardFaceView === 'image' && (
            <ImageCardFace name={name} field={field} front={front} />
          )}

          {cardFaceView === 'both' && (
            <ImageAndTextCardFace name={name} field={field} front={front} />
          )}
        </Grid>
      </div>
    </PaperCard>
  );
};

type CardFaceTypeProps = {
  name: string;
  field: FieldInputProps<CardFaceFieldValues>;
  front?: boolean;
};

const CardFaceTextField: React.FC<CardFaceTypeProps & TextFieldProps> = ({
  name,
  field,
  front,
  ...props
}) => {
  const cs = useStyles();

  return (
    <TextField
      name={`${name}.text`}
      fullWidth
      colour={field.value.colour}
      label={front ? 'Frontside Clue Text' : 'Backside Answer Text'}
      inputProps={{ className: cs.cardTextInput }}
      InputLabelProps={{
        shrink: true,
      }}
      {...props} //TODO: input and label font sizes
    />
  );
};

const TextCardFace: React.FC<CardFaceTypeProps> = ({ name, field, front }) => {
  return (
    <Grid item xs={12} style={{ height: '100%', width: '100%' }}>
      <CardFaceTextField
        fullHeight={true}
        {...{ name, field, front }}
        multiline={true}
        variant="outlined"
      />
    </Grid>
  );
};

const ImageCardFace: React.FC<CardFaceTypeProps> = ({ name }) => {
  const CropperParent = React.useRef<HTMLDivElement>();
  const [px, setPx] = React.useState(150);
  React.useEffect(() => {
    if (CropperParent?.current)
      setPx(Math.round(CropperParent?.current.offsetWidth * 0.95));
  }, [CropperParent]);

  return (
    <Grid item xs={12} ref={CropperParent}>
      <ImageCropperField px={px} max={3} name={`${name}.imageCropArgs`} />
    </Grid>
  );
};

const ImageAndTextCardFace: React.FC<CardFaceTypeProps> = ({ name, field, front }) => {
  const cs = useStyles();
  const CropperParent = React.useRef<HTMLDivElement>();
  const [px, setPx] = React.useState(150);
  React.useEffect(() => {
    if (CropperParent?.current)
      setPx(Math.round(CropperParent?.current.offsetWidth * 0.62));
  }, [CropperParent]);

  return (
    <>
      <Grid item xs={12} ref={CropperParent}>
        <ImageCropperField px={px} max={3} name={`${name}.imageCropArgs`} />
      </Grid>

      <Grid item xs={12} className={cs.bottomContainer}>
        <CardFaceTextField {...{ name, field, front }} />
      </Grid>
    </>
  );
};
