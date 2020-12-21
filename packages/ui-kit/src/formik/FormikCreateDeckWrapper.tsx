import * as React from 'react';
import { FlipCardFieldValues } from '@types';
import { Formik, Form, FormikConfig } from 'formik';

export const initialCardValues: FlipCardFieldValues = {
  front: {
    text: '',
    imgLink: '',
    imgFile: null,
  },
  back: {
    text: '',
    imgLink: '',
    imgFile: null,
  },
  answer: '',
};

type FormikCreateDeckWrapperProps = Omit<
  FormikConfig<{ deckCards: FlipCardFieldValues[] }>,
  'initialValues' | 'render'
> & {
  initialValues?: FlipCardFieldValues[];
};

export const FormikCreateDeckWrapper: React.FC<FormikCreateDeckWrapperProps> = ({
  initialValues = [initialCardValues],
  children,
  ...props
}) => {
  return (
    <Formik
      initialValues={{ deckCards: initialValues }}
      onSubmit={(values) => Promise.resolve(console.log(JSON.stringify(values, null, 2)))}
      {...props}
    >
      <Form>{children}</Form>
    </Formik>
  );
};
