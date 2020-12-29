import * as React from 'react';
import { makeStyles, TextField as MuiTextField, TextFieldProps, Theme } from '@material-ui/core';
import { Field } from 'formik';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      width: 'fit-content',
      padding: 7,
      borderRadius: 8,
      backgroundColor: '#fbfbfb', //theme.palette.silver.light,
      '& input': {
        [theme.breakpoints.only('xs')]: {
          padding: '10px 0',
        },
      },
    },
    scale: {
      [theme.breakpoints.only('xs')]: {
        transform: 'scale(0.7)',
      },
      [theme.breakpoints.up('sm')]: {
        transform: 'scale(0.9)',
      },
      [theme.breakpoints.up('md')]: {
        transform: 'scale(1.1)',
      },
      [theme.breakpoints.up('lg')]: {
        transform: 'scale(1.25)',
      },
      [theme.breakpoints.only('xl')]: {
        transform: 'scale(1.4)',
      },
    },
  };
});

export const TextField: React.FC<TextFieldProps> = ({ className, ...props }) => {
  const cs = useStyles();

  const outlined = props.variant === 'outlined';

  if (!props.name) {
    return (
      <div className={clsx({ [cs.root]: outlined }, cs.scale, className)}>
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
          <div className={clsx({ [cs.root]: outlined }, cs.scale, className)}>
            <MuiTextField
              {...fieldProps}
              name={name}
              error={touched && !!error}
              helperText={error}
              disabled={props.disabled ?? isSubmitting}
              {...props}
            />
          </div>
        );
      }}
    </Field>
  );
};
