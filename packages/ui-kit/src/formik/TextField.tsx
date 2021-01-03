import * as React from 'react';
import {
  makeStyles,
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
  Theme,
} from '@material-ui/core';
import { Field } from 'formik';
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
    fullWidth: {
      width: 'calc(100% - 14px)',
    },
  };
});

type TextFieldProps = MuiTextFieldProps & {
  colour?: CustomColours;
};

export const TextField: React.FC<TextFieldProps> = ({ className, colour = 'white', ...props }) => {
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
    <Field name={props.name}>
      {({
        field: { name, onChange, onBlur, onFocus, ...field },
        form: { isSubmitting },
        meta: { touched, error },
      }) => {
        const fieldProps = {
          onChange: props.onChange ?? onChange,
          onBlur: props.onBlur ?? onBlur,
          onFocus: props.onFocus ?? onFocus,
          ...field,
        };

        return (
          <div
            className={clsx(
              { [cs.root]: outlined, [cs[`root-${colour}-bg`]]: outlined },
              cs.input,
              cs[`root-${colour}`],
              className,
            )}
          >
            <MuiTextField
              {...props}
              {...fieldProps}
              name={name}
              error={touched && !!error}
              helperText={error}
              disabled={props.disabled ?? isSubmitting}
            />
          </div>
        );
      }}
    </Field>
  );
};
