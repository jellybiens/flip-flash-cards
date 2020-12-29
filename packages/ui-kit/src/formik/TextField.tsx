import * as React from 'react';
import { makeStyles, TextField as MuiTextField, TextFieldProps } from '@material-ui/core';
import { Field } from 'formik';
import clsx from 'clsx';

const useStyles = makeStyles(() => {
  return {
    root: {
      padding: 7,
      borderRadius: 8,
      backgroundColor: '#fbfbfb', //theme.palette.silver.light,
    },
    fullWidth: {
      width: 'calc(100% - 14px)',
    },
  };
});

export const TextField: React.FC<TextFieldProps> = ({ className, ...props }) => {
  const cs = useStyles();

  const outlined = props.variant === 'outlined';

  if (!props.name) {
    return (
      <div className={clsx({ [cs.root]: outlined, [cs.fullWidth]: props.fullWidth }, className)}>
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
          <div className={clsx({ [cs.root]: outlined }, className)}>
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
