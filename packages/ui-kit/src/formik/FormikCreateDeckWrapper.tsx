import * as React from 'react';
import { FlipCardFieldValues } from '@types';
import { Formik, Form, FormikConfig } from 'formik';
import { v4 } from 'uuid';

const imageCropArgs = {
  image: null,
  position: { x: 0, y: 0 },
  scale: { width: 300, height: 300 },
  px: 1,
};

export const initialCardValues = (): FlipCardFieldValues => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  _id: v4(),
  front: {
    text: '',
    imageCropArgs,
    imgFile: null,
    colour: 'white',
  },
  back: {
    text: '',
    imageCropArgs,
    imgFile: null,
    colour: 'white',
  },
});

type FormikCreateDeckWrapperProps = Omit<
  FormikConfig<{ deckCards: FlipCardFieldValues[] }>,
  'initialValues' | 'render'
> & {
  initialValues?: FlipCardFieldValues[];
};
//TODO: import onSubmit

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
