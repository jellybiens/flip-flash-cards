import * as React from 'react';
import { FlipCardFieldValues } from '@types';
import { Formik, Form, FormikConfig } from 'formik';
import { uniqueId } from 'lodash';

export const initialCardValues = (): FlipCardFieldValues => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  cardId: uniqueId('card-') as string,
  front: {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    text: uniqueId('card-') as string,
    imgLink: '',
    imgFile: null,
  },
  back: {
    text: '',
    imgLink: '',
    imgFile: null,
  },
  answer: '',
});

type FormikCreateDeckWrapperProps = Omit<
  FormikConfig<{ deckCards: FlipCardFieldValues[] }>,
  'initialValues' | 'render'
> & {
  initialValues?: FlipCardFieldValues[];
};

export const FormikCreateDeckWrapper: React.FC<FormikCreateDeckWrapperProps> = ({
  initialValues = [initialCardValues()],
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
