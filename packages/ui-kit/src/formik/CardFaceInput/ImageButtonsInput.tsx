import * as React from 'react';
import { useField } from 'formik';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { SquareButton } from '../../atoms/Buttons';
import { CardFaceFieldValues } from '@types';

export const useStyles = makeStyles((theme: Theme) => ({
  buttonContainer: {
    top: '50%',
    position: 'relative',
    width: '100%',
    [theme.breakpoints.only('xs')]: {
      transform: 'translateY(-50%)',
      '& button': { fontSize: '0.45em', whiteSpace: 'nowrap' },
      '& svg': { display: 'none' },
    },
    [theme.breakpoints.only('sm')]: {
      transform: 'translateY(-25%)',
      '& button': { fontSize: '0.65em', whiteSpace: 'nowrap' },
      '& svg': { display: 'none' },
    },
    [theme.breakpoints.up('md')]: {
      transform: 'translateY(-25%) scale(1.1)',
      '& button': { fontSize: '0.7em', whiteSpace: 'nowrap' },
    },
    [theme.breakpoints.up('lg')]: {
      transform: 'translateY(-25%) scale(1.1)',
      '& button': { fontSize: '.95em', whiteSpace: 'nowrap' },
    },
    [theme.breakpoints.up('xl')]: {
      '& button': { fontSize: '1em', whiteSpace: 'nowrap' },
    },
  },
  buttonWrapper: {
    width: '85%',
    margin: 'auto',
  },
}));

type ImageButtonsInputProps = {
  handleShowInput: () => void;
  fieldName: string;
};

export const ImageButtonsInput: React.FC<ImageButtonsInputProps> = ({
  handleShowInput,
  fieldName,
}) => {
  const cs = useStyles();
  const [field, , helpers] = useField<CardFaceFieldValues>(fieldName);
  const uploadInput = React.useRef<HTMLInputElement>();

  return (
    <>
      <Grid item xs={6}>
        <div className={cs.buttonContainer}>
          <div className={cs.buttonWrapper}>
            <SquareButton fullWidth startIcon="addImage" colour="green" onClick={handleShowInput}>
              Paste Image Link
            </SquareButton>
          </div>
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
        <div className={cs.buttonContainer}>
          <div className={cs.buttonWrapper}>
            <SquareButton
              fullWidth
              startIcon="save"
              colour="cyan"
              onClick={() => uploadInput.current.click()}
            >
              Upload Image
            </SquareButton>
          </div>
        </div>
      </Grid>
    </>
  );
};
// TODO: Button Text
