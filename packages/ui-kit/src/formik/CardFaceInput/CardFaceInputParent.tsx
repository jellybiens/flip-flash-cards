import * as React from 'react';
import clsx from 'clsx';
import { Grid, InputAdornment } from '@material-ui/core';
import { PaperCard } from '../../atoms/PaperCard';
import { useField } from 'formik';
import { TextField } from '../TextField';
import { CircleButton } from '../../atoms/Buttons';

import { useStyles } from './useCardStyles';
import { ImageButtonsInput } from './ImageButtonsInput';
import { ImageDisplay } from './ImageDisplay';

export type CardFaceInputProps = {
  name: string;
  makeFocus?: React.MutableRefObject<HTMLInputElement>;
};

// TODO: update with global type
export type CardFacePropsFieldValues = {
  text?: string;
  imgLink?: string;
  imgFile?: File;
};

export const CardFaceInput: React.FC<CardFaceInputProps> = ({ name, makeFocus }) => {
  const cs = useStyles();
  const [field, , helpers] = useField<CardFacePropsFieldValues>(name);
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
            <ImageButtonsInput handleShowInput={() => setShowInput(true)} fieldName={name} />
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
            <ImageDisplay handleRevertImage={revertImageInput} imgLink={field.value.imgLink} />
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
