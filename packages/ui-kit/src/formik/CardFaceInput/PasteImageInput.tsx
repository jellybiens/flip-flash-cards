import * as React from 'react';
import { CardFaceFieldValues } from '@types';
import { InputAdornment, makeStyles, Theme } from '@material-ui/core';
import { useField } from 'formik';
import { TextField } from '../TextField';
import { CircleButton } from '../../atoms/Buttons';

export const useStyles = makeStyles((theme: Theme) => {
  const textFieldScaling = {
    [theme.breakpoints.only('sm')]: { transform: 'scale(0.9)' },
    [theme.breakpoints.only('md')]: { transform: 'scale(1.2)' },
    [theme.breakpoints.only('lg')]: { transform: 'scale(1.5)' },
    [theme.breakpoints.only('xl')]: { transform: 'scale(1.8)' },
  };

  return {
    imageFieldWrapper: {
      margin: 'auto',
      [theme.breakpoints.only('xs')]: { transform: 'scale(0.8)' },
      ...textFieldScaling,
    },
    adornmentWrapper: {
      transform: 'scale(0.7) translate(-5px, -20px)',
      zIndex: 10,
    },

    backButton: {
      zIndex: 100,
      margin: '-40px -30px 0',
    },
  };
});

type CardFaceInputProps = {
  name: string;
  handleRevertImage: () => void;
};

export const PasteImageInput: React.FC<CardFaceInputProps> = ({
  name,
  handleRevertImage,
}) => {
  const cs = useStyles();
  const [field, , helpers] = useField<CardFaceFieldValues>(name);

  const handlePaste = (e: ClipboardEvent) => {
    const image = e.clipboardData.files[0];
    helpers.setValue({
      ...field.value,
      imgLink: URL.createObjectURL(image),
      imgFile: image,
    });
  };

  React.useEffect(() => {
    window.addEventListener('paste', handlePaste);

    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  }, []);

  return (
    <div className={cs.imageFieldWrapper}>
      <TextField
        colour={field.value.colour}
        label="&nbsp;Paste Image or Link"
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
                onClick={handleRevertImage}
                className={cs.backButton}
              />
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};
