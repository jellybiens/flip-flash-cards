import * as React from 'react';
import clsx from 'clsx';
import { CardFaceFieldValues, CustomColours } from '@types';
import { Grid, makeStyles, Theme, Typography } from '@material-ui/core';
import { PaperCard } from '../atoms/PaperCard';
import { FieldInputProps, useField } from 'formik';
import { TextFieldInput, TextFieldInputProps } from './TextFieldInput';
import { FlipCardColours, FlipCardFaceStyles } from '../definitions';
import { ColourPicker } from './ColourPicker';
import { ImageCropperField } from './ImageCropperField';
import { SquareButton, CircleButton } from '../atoms/Buttons';
import { useWindowSize } from '../helpers';

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
    menuButtons: {
      whiteSpace: 'nowrap',
    },
    fontSizes: {
      [theme.breakpoints.only('xs')]: { fontSize: 12.5 },
      [theme.breakpoints.only('sm')]: { fontSize: 22.5 },
      [theme.breakpoints.only('md')]: { fontSize: 32.5 },
      [theme.breakpoints.only('lg')]: { fontSize: 42.5 },
      [theme.breakpoints.only('xl')]: { fontSize: 52.5 },
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
  };
});

export type CardFaceViewOption = 'menu' | 'text' | 'image' | 'both';

type CardFaceInputProps = {
  name: string;
  cardIndex: number;
  front?: boolean;
  back?: boolean;
  cardFaceView: CardFaceViewOption;
  setCardFaceView: (view: CardFaceViewOption) => void;
};

export const CardFaceInput: React.FC<CardFaceInputProps> = ({
  name,
  cardIndex,
  front = false,
  cardFaceView,
  setCardFaceView,
}) => {
  const cs = useStyles();
  const [field, , helpers] = useField<CardFaceFieldValues>(name);

  const revertFaceValues = () => {
    void helpers.setValue({
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
    void setCardFaceView('menu');
  };

  const buttonColours = (() => {
    const rotateHues = {
      default: ['blue', 'green', 'cyan', 'turquoise'],
      green: ['blue', 'purple', 'cyan', 'violet'],
      lime: ['blue', 'purple', 'cyan', 'violet'],
      turquoise: ['lime', 'purple', 'cyan', 'violet'],
      cyan: ['lime', 'purple', 'green', 'violet'],
      blue: ['lime', 'purple', 'green', 'violet'],
    };
    if (Object.keys(rotateHues).includes(field.value.colour)) {
      return rotateHues[field.value.colour] as CustomColours[];
    } else {
      return rotateHues.default as CustomColours[];
    }
  })();

  return (
    <PaperCard className={clsx(cs[`${field.value.colour}Card`], cs.cardFace)}>
      <Typography variant="subtitle1" className={cs.numberText}>
        {`Card #${cardIndex + 1} ${front ? 'Frontface' : 'Backface'}`}
      </Typography>

      {cardFaceView !== 'menu' && (
        <>
          <div className={cs.backButton}>
            <CircleButton
              iconName="prev"
              colour={buttonColours[0]}
              onClick={revertFaceValues}
            />
          </div>
          <div className={cs.colourPicker}>
            <ColourPicker name={`${name}.colour`} />
          </div>
        </>
      )}

      <div style={{ height: '100%', width: '100%' }}>
        <Grid container style={{ height: '100%', width: '100%', padding: '8%' }}>
          {cardFaceView === 'menu' && (
            <Grid item xs={12} container spacing={0}>
              <Grid item xs={12} style={{ margin: 'auto' }}>
                <SquareButton
                  className={clsx(cs.menuButtons, cs.fontSizes)}
                  fullWidth
                  colour={buttonColours[1]}
                  onClick={() => setCardFaceView('text')}
                >
                  Text Only
                </SquareButton>
              </Grid>
              <Grid item xs={12} style={{ margin: 'auto' }}>
                <SquareButton
                  className={clsx(cs.menuButtons, cs.fontSizes)}
                  fullWidth
                  colour={buttonColours[2]}
                  onClick={() => setCardFaceView('image')}
                >
                  Image Only
                </SquareButton>
              </Grid>
              <Grid item xs={12} style={{ margin: 'auto' }}>
                <SquareButton
                  className={clsx(cs.menuButtons, cs.fontSizes)}
                  fullWidth
                  colour={buttonColours[3]}
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

const CardFaceTextField: React.FC<
  CardFaceTypeProps & Omit<TextFieldInputProps, 'colour' | 'children'>
> = ({ name, field, front, ...props }) => {
  const { fontSizes } = useStyles();
  return (
    <TextFieldInput
      className={fontSizes}
      name={`${name}.text`}
      fullWidth
      colour={field.value.colour}
      placeholder={front ? 'Frontside Clue Text' : 'Backside Answer Text'}
      {...props}
    />
  );
};

const TextCardFace: React.FC<CardFaceTypeProps> = ({ name, field, front }) => {
  return (
    <Grid item xs={12} style={{ height: '100%', width: '100%' }}>
      <CardFaceTextField fullWidth multiline={true} {...{ name, field, front }} />
    </Grid>
  );
};

const ImageCardFace: React.FC<CardFaceTypeProps> = ({ name }) => {
  const { width: windowInnerWidth } = useWindowSize();
  const CropperParent = React.useRef<HTMLDivElement>();
  const [px, setPx] = React.useState(150);
  React.useLayoutEffect(() => {
    if (CropperParent?.current)
      setPx(Math.round(CropperParent?.current.offsetWidth * 0.9));
  }, [windowInnerWidth]);

  return (
    <Grid item xs={12} ref={CropperParent}>
      <ImageCropperField px={px} max={3} name={`${name}.imageCropArgs`} />
    </Grid>
  );
};

const ImageAndTextCardFace: React.FC<CardFaceTypeProps> = ({ name, field, front }) => {
  const { width: windowInnerWidth } = useWindowSize();
  const CropperParent = React.useRef<HTMLDivElement>();
  const [px, setPx] = React.useState(150);
  React.useLayoutEffect(() => {
    if (CropperParent?.current)
      setPx(Math.round(CropperParent?.current.offsetWidth * 0.62));
  }, [windowInnerWidth]);

  return (
    <>
      <Grid item xs={12} ref={CropperParent} style={{ height: '70%' }}>
        <ImageCropperField px={px} max={3} name={`${name}.imageCropArgs`} />
      </Grid>

      <Grid item xs={12} style={{ height: '30%' }}>
        <CardFaceTextField {...{ name, field, front }} />
      </Grid>
    </>
  );
};
