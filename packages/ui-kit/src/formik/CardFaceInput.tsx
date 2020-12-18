import * as React from 'react';
import { makeStyles, Theme, Grid, InputAdornment } from '@material-ui/core';
import { PaperCard } from '../atoms/PaperCard';
import { useField } from 'formik';
import { TextField } from './TextField';
import { CircleButton, ResponsiveButton } from '../atoms/Buttons';
import { CustomColours } from '../themes';
import { FlipCardFaceStyles } from '../definitions';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => {
  return {
    ...FlipCardFaceStyles,
    evenSplitContainer: {
      height: '50%',
      width: '50%',
    },
    textField: {
      transform: 'translateY(-50%)',
      top: '50%',
      position: 'relative',
    },
    textFieldInput: {
      textAlign: 'center',
      [theme.breakpoints.only('sm')]: {
        fontSize: '1em',
      },
      [theme.breakpoints.up('sm')]: {
        fontSize: '1.5em',
      },
    },
    buttons: {
      [theme.breakpoints.only('sm')]: {
        transform: 'translateY(-50%)',
      },
      [theme.breakpoints.only('sm')]: {
        transform: 'translateY(0%)',
      },
      [theme.breakpoints.up('md')]: {
        transform: 'translateY(50%)',
      },
      position: 'relative',
      top: '50%',
      width: '80%',
      left: '10%',
    },
    backButton: { margin: '-50px -30px 0', transform: 'scale(0.8)', zIndex: 100 },
    binButton: { position: 'absolute', top: 5, right: 5 },
  };
});

export type CardFaceInputProps = {
  name: string;
  makeFocus?: React.MutableRefObject<HTMLInputElement>;
};

type CardFacePropsFieldValues = {
  text?: string;
  imgLink?: string;
  imgFile?: string;
};

export const CardFaceInput: React.FC<CardFaceInputProps> = ({ name, makeFocus }) => {
  const cs = useStyles();
  const [field, , helpers] = useField<CardFacePropsFieldValues>(name);
  const [showInput, setShowInput] = React.useState(false);
  const uploadInput = React.useRef<HTMLInputElement>();

  const showButtons = !field.value.imgLink && !showInput;

  const revertImageInput = () => {
    setShowInput(false);
    helpers.setValue({ ...field.value, imgLink: '' });
  };

  return (
    <Grid container className={cs.cardFace} component={PaperCard}>
      <Grid
        item
        xs={12}
        className={clsx({
          [cs.imageArea]: !!field.value.imgLink,
          [cs.evenSplitContainer]: !field.value.imgLink,
        })}
      >
        <Grid
          container
          style={{ border: !field.value.imgLink && 'unset' }}
          className={cs.imageContainer}
        >
          {showButtons && (
            <>
              <Grid item xs={6}>
                <div className={cs.buttons}>
                  <ResponsiveButton
                    fullWidth
                    startIcon="addImage"
                    colour={CustomColours.green}
                    onClick={() => setShowInput(true)}
                  >
                    Paste Image Link
                  </ResponsiveButton>
                </div>
              </Grid>
              <Grid item xs={6}>
                <input
                  hidden
                  ref={uploadInput}
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) => {
                    helpers.setValue({
                      ...field.value,
                      imgLink: URL.createObjectURL(e.target.files[0]),
                    });
                  }}
                />
                <div className={cs.buttons}>
                  <ResponsiveButton
                    fullWidth
                    startIcon="save"
                    colour={CustomColours.cyan}
                    onClick={() => uploadInput.current.click()}
                  >
                    Upload Image
                  </ResponsiveButton>
                </div>
              </Grid>
            </>
          )}

          {showInput && !field.value.imgLink && (
            <Grid item xs={12}>
              <div className={cs.buttons}>
                <TextField
                  focused
                  className={cs.textField}
                  name={`${name}.imgLink`}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CircleButton
                          iconName="prev"
                          colour={CustomColours.dull}
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

          {!!field.value.imgLink && (
            <Grid item xs={12}>
              <img className={cs.faceImage} src={field.value.imgLink} />
              <CircleButton
                className={cs.binButton}
                iconName="bin"
                colour={CustomColours.red}
                size="small"
                onClick={revertImageInput}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        className={clsx({
          [cs.bottomContainer]: !!field.value.imgLink,
          [cs.evenSplitContainer]: !field.value.imgLink,
        })}
      >
        <TextField
          className={clsx({ [cs.textField]: !!field.value.imgLink })}
          label="Card Text"
          name={`${name}.text`}
          inputProps={{ className: cs.textFieldInput, ref: makeFocus }}
        />
      </Grid>
    </Grid>
  );
};
