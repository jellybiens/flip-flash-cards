import * as React from 'react';
import {
  makeStyles,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
  Theme,
} from '@material-ui/core';
import { FastField, FastFieldProps } from 'formik';
import clsx from 'clsx';
import { CustomColours } from '@types';
import { textFieldColours } from '../definitions/textField';

const useStyles = makeStyles((theme: Theme) => {
  return {
    ...textFieldColours(theme),
    root: {
      padding: 7,
      borderRadius: 8,
    },
    input: {
      width: 'fit-content',
      margin: 'auto',
    },
    inputFullWidth: {
      width: 'calc(100% - 14px)',
      margin: 'auto',
    },
    fullWidth: {
      width: 'calc(100% - 14px)',
    },
    fullHeight: {
      height: 'calc(100% - 14px)',
    },
  };
});

export type TextFieldProps = MuiTextFieldProps & {
  colour?: CustomColours;
  fullHeight?: boolean;
};

export const TextField: React.FC<TextFieldProps> = ({
  className,
  colour = 'white',
  fullHeight = false,
  ...props
}) => {
  const cs = useStyles();

  const outlined = props.variant === 'outlined';

  if (!props.name) {
    return (
      <div
        className={clsx(
          {
            [cs.root]: outlined,
            [cs[`root-${colour}-bg`]]: outlined,
            [cs.fullWidth]: props.fullWidth,
            [cs.fullHeight]: fullHeight,
          },
          cs.input,
          cs[`root-${colour}`],
          className,
        )}
      >
        <MuiTextField {...props} />
      </div>
    );
  }

  return (
    <FastField name={props.name}>
      {({
        field: { name, onChange, onBlur, ...field },
        form: { isSubmitting },
        meta: { touched, error },
      }: FastFieldProps<string>) => {
        const fieldProps = {
          onChange: props.onChange ?? onChange,
          onBlur: props.onBlur ?? onBlur,
          ...field,
        };

        return (
          <div
            className={clsx(
              { [cs.root]: outlined, [cs[`root-${colour}-bg`]]: outlined },

              cs[`root-${colour}`],
              className,
              {
                [cs.inputFullWidth]: props.fullWidth,
                [cs.input]: !props.fullWidth,
                [cs.fullHeight]: fullHeight,
              },
            )}
          >
            <MuiTextField
              {...props}
              {...fieldProps}
              name={name}
              style={{ height: fullHeight && '100%' }}
              error={touched && !!error}
              helperText={error}
              disabled={props.disabled ?? isSubmitting}
              InputProps={{
                style: { height: fullHeight && '100%', ...props?.InputProps?.style },
                ...props?.InputProps,
              }}
            />
          </div>
        );
      }}
    </FastField>
  );
};
