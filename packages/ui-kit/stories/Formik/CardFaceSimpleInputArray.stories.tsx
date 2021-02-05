import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Container, FormikStateValues } from '../helpers';
import { FormikCreateDeckWrapper, FlipCardSimpleInputArray } from '@ui-kit';
import { FlipCardFieldValues } from '@types';
import { uniqueId } from 'lodash';
import { FormikHelpers } from 'formik';

const title = 'CardFaceSimpleInputArray';

const generateString = (): string => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return uniqueId('card-');
};

const initialCardValues: FlipCardFieldValues[] = [
  {
    _id: generateString(),
    front: {
      text: 'Spongebob',
      imgLink: 'https://nickelodeonuniverse.com/wp-content/uploads/Spongebob.png',
      imgFile: null,
      colour: 'white',
    },
    back: {
      text: 'Squarepants',
      imgLink: '',
      imgFile: null,
      colour: 'white',
    },
  },
  {
    _id: generateString(),
    front: {
      text: '11111',
      imgLink: '',
      imgFile: null,
      colour: 'white',
    },
    back: {
      text: '11111',
      imgLink: '',
      imgFile: null,
      colour: 'white',
    },
  },
  {
    _id: generateString(),
    front: {
      text: '2222',
      imgLink: '',
      imgFile: null,
      colour: 'white',
    },
    back: {
      text: '2222',
      imgLink: '',
      imgFile: null,
      colour: 'white',
    },
  },
  {
    _id: generateString(),
    front: {
      text: '3333',
      imgLink: '',
      imgFile: null,
      colour: 'white',
    },
    back: {
      text: '33333',
      imgLink: '',
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
        <FlipCardSimpleInputArray />
        <button type="submit">Set Errors</button>
        <FormikStateValues />
      </FormikCreateDeckWrapper>
    </Container>
  );
};

storiesOf('Core/Formik', module).add(title, Story);
