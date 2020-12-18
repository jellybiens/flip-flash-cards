import * as React from 'react';
import { TextField as MuiTextField, TextFieldProps } from '@material-ui/core';
import { Field } from 'formik';

// TODO: add formik props
export const TextField: React.FC<TextFieldProps> = (props) => {
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

        return (
          <MuiTextField
            {...fieldProps}
            name={name}
            error={touched && !!error}
            helperText={error}
            disabled={props.disabled ?? isSubmitting}
            {...props}
          />
        );
      }}
    </Field>
  );
};
