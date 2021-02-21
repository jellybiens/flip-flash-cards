import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Container, FormikStateValues } from '../helpers';
import { FormikCreateDeckWrapper, FlipCardInputArray } from '@ui-kit';
import { FlipCardFieldValues } from '@types';
import { uniqueId } from 'lodash';
import { FormikHelpers } from 'formik';

const title = 'CardFaceInputArray';

const generateString = (): string => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return uniqueId('card-');
};

const imageCropArgs = {
  image: null,
  position: { x: 0, y: 0 },
  scale: { width: 300, height: 300 },
  px: 1,
};

export const initialCardValues: FlipCardFieldValues[] = [
  {
    _id: generateString(),
    front: {
      text:
        'Spongebob Oh boy Lefs soo how many characters and lines this is and put it into the formik default',
      imgFile: null,
      colour: 'white',
      imageCropArgs,
    },
    back: {
      text: 'Squarepants',
      imageCropArgs,
      imgFile: null,
      colour: 'white',
    },
  },
  {
    _id: generateString(),
    front: {
      text: '11111',
      imageCropArgs,
      imgFile: null,
      colour: 'white',
    },
    back: {
      text: '11111',
      imageCropArgs,
      imgFile: null,
      colour: 'white',
    },
  },
  {
    _id: generateString(),
    front: {
      text: '2222',
      imageCropArgs,
      imgFile: null,
      colour: 'white',
    },
    back: {
      text: '2222',
      imageCropArgs,
      imgFile: null,
      colour: 'white',
    },
  },
  {
    _id: generateString(),
    front: {
      text: '3333',
      imageCropArgs,
      imgFile: null,
      colour: 'white',
    },
    back: {
      text: '33333',
      imageCropArgs,
      imgFile: null,
      colour: 'white',
    },
  },
];

const Story = () => {
  const handleSubmit = (
    values: { deckCards },
    helpers: FormikHelpers<{ deckCards: FlipCardFieldValues[] }>,
  ) => {
    helpers.setErrors({
      deckCards: [{ front: { text: 'Incorrect' } }, {}, { back: { text: 'Incorrect' } }],
    });
    return Promise.resolve(false);
  };

  return (
    <Container title={title}>
      <FormikCreateDeckWrapper initialValues={initialCardValues} onSubmit={handleSubmit}>
        <FlipCardInputArray />
        <button type="submit">Set Errors</button>
        <FormikStateValues />
      </FormikCreateDeckWrapper>
    </Container>
  );
};

storiesOf('Core/Formik', module).add(title, Story);
