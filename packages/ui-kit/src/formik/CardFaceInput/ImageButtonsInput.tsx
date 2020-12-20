import * as React from 'react';
import { useField } from 'formik';
import { Grid } from '@material-ui/core';
import { ResponsiveButton } from '../../atoms/Buttons';
import { useStyles } from './useCardStyles';
import { CardFacePropsFieldValues } from './CardFaceInputParent';

type ImageButtonsInputProps = {
  handleShowInput: () => void;
  fieldName: string;
};

export const ImageButtonsInput: React.FC<ImageButtonsInputProps> = ({
  handleShowInput,
  fieldName,
}) => {
  const cs = useStyles();
  const [field, , helpers] = useField<CardFacePropsFieldValues>(fieldName);
  const uploadInput = React.useRef<HTMLInputElement>();

  return (
    <>
      <Grid item xs={6}>
        <div className={cs.buttons}>
          <ResponsiveButton fullWidth startIcon="addImage" colour="green" onClick={handleShowInput}>
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
  );
};
