import * as React from 'react';
import { makeStyles, Theme, Grid, InputAdornment } from '@material-ui/core';
import { PaperCard } from '../atoms/PaperCard';
import { useField } from 'formik';
import { TextField } from './TextField';
import { CircleButton, ResponsiveButton } from '../atoms/Buttons';
import { FlipCardFaceStyles } from '../definitions';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => {
  return {
    ...FlipCardFaceStyles,
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
    backButton: { margin: '-50px -30px 0', transform: 'scale(0.8)', zIndex: 100 },
    binButton: { position: 'absolute', top: 5, right: 5 },
  };
});

export type CardFaceInputProps = {
  name: string;
  makeFocus?: React.MutableRefObject<HTMLInputElement>;
};

// TODO: update with global type
type CardFacePropsFieldValues = {
  text?: string;
  imgLink?: string;
  imgFile?: File;
};

export const CardFaceInput: React.FC<CardFaceInputProps> = ({ name, makeFocus }) => {
  const cs = useStyles();
  const [field, , helpers] = useField<CardFacePropsFieldValues>(name);
  const [showInput, setShowInput] = React.useState(false);
  const [imageSrcValid, setImageSrcValid] = React.useState(false);
  const uploadInput = React.useRef<HTMLInputElement>();

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
              <Grid item xs={6}>
                <div className={cs.buttons}>
                  <ResponsiveButton
                    fullWidth
                    startIcon="addImage"
                    colour="green"
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
                      imgFile: e.target.files[0],
                    });
                  }}
                />
                <div className={cs.buttons}>
                  <ResponsiveButton
                    fullWidth
                    startIcon="save"
                    colour="cyan"
                    onClick={() => uploadInput.current.click()}
                  >
                    Upload Image
                  </ResponsiveButton>
                </div>
              </Grid>
            </>
          )}

          {showInput && !imageSrcValid && (
            <Grid item xs={12}>
              <div className={cs.pasteTextfield}>
                <TextField
                  label="Image Link"
                  fullWidth
                  focused
                  className={cs.textField}
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
            <Grid item xs={12}>
              <img className={cs.faceImage} src={field.value.imgLink} />
              <CircleButton
                className={cs.binButton}
                iconName="bin"
                colour="red"
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
          [cs.bottomContainer]: !!imageSrcValid,
          [cs.evenSplitContainer]: !imageSrcValid,
        })}
      >
        <TextField
          className={clsx(cs.textFieldContainer, { [cs.textField]: !!imageSrcValid })}
          label="Card Text"
          name={`${name}.text`}
          inputProps={{ className: cs.textFieldInput, ref: makeFocus }}
        />
      </Grid>
    </Grid>
  );
};
