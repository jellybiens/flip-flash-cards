import * as React from 'react';
import { makeStyles, TextField as MuiTextField, TextFieldProps, Theme } from '@material-ui/core';
import { Field } from 'formik';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: '#fbfbfb', //theme.palette.silver.light,
    },
    resize: {
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
    reset: {
      fontSize: '1em',
    },
    shrink: {
      [theme.breakpoints.up('lg')]: {
        transform: 'translate(14px, -11px) scale(0.75) !important',
        fontSize: '2em',
      },
    },
    labelSpacing: {
      '& > fieldset': {
        '& > legend': {
          '& > span': {
            [theme.breakpoints.up('lg')]: {
              fontSize: '2em',
            },
          },
        },
      },
    },
    helperResize: {
      [theme.breakpoints.up('lg')]: {
        fontSize: '1.25em ',
      },
    },
  };
});

export const TextField: React.FC<TextFieldProps> = ({ InputProps, ...props }) => {
  const cs = useStyles();

  const InputProperties: Partial<TextFieldProps['InputProps']> = {
    ...InputProps,
    classes: {
      //root: cs.root,
      input: cs.resize,
      root: cs.labelSpacing,
      ...InputProps?.classes,
    },
  };

  return (
    <Field name={props.name}>
      {({
        field: { name, onChange, onBlur, onFocus, ...field },
        form: { isSubmitting }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta: { touched, error },
      }) => {
        const fieldProps = {
          onChange: props.onChange ?? onChange,
          onBlur: props.onBlur ?? onBlur,
          onFocus: props.onFocus ?? onFocus,
          ...field,
        };

        const TextBox = (
          <MuiTextField
            {...fieldProps}
            name={name}
            error={touched && !!error}
            helperText={error}
            disabled={props.disabled ?? isSubmitting}
            InputProps={InputProperties}
            InputLabelProps={{
              ...props?.InputLabelProps,
              classes: {
                root: cs.resize,
                shrink: clsx(cs.reset, cs.shrink),
                focused: clsx(cs.reset, cs.shrink),
              },
            }}
            FormHelperTextProps={{
              ...props?.FormHelperTextProps,
              classes: {
                root: cs.helperResize,
              },
            }}
            {...props}
          />
        );

        return props.variant === 'outlined' ? <div className={cs.root}>{TextBox}</div> : TextBox;
      }}
    </Field>
  );
};
