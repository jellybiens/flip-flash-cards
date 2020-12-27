import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Container } from '../helpers';
import { FormikCreateDeckWrapper, FlipCardInputArray } from '@ui-kit';
import { FlipCardFieldValues } from '@types';
import { uniqueId } from 'lodash';
import { FormikHelpers } from 'formik';

const title = 'CardFaceInputArray';

const generateString = (): string => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  return uniqueId('card-');
};

const initialCardValues: FlipCardFieldValues[] = [
  {
    cardId: generateString(),
    front: {
      text: 'Spongebob',
      imgLink: 'https://nickelodeonuniverse.com/wp-content/uploads/Spongebob.png',
      imgFile: null,
    },
    back: {
      text: 'Squarepants',
      imgLink: '',
      imgFile: null,
    },
  },
  {
    cardId: generateString(),
    front: {
      text: '11111',
      imgLink: '',
      imgFile: null,
    },
    back: {
      text: '11111',
      imgLink: '',
      imgFile: null,
    },
  },
  {
    cardId: generateString(),
    front: {
      text: '2222',
      imgLink: '',
      imgFile: null,
    },
    back: {
      text: '2222',
      imgLink: '',
      imgFile: null,
    },
  },
  {
    cardId: generateString(),
    front: {
      text: '3333',
      imgLink: '',
      imgFile: null,
    },
    back: {
      text: '33333',
      imgLink: '',
      imgFile: null,
    },
  },
];

const Story = () => {
  const handleSubmit = (
    values: { deckCards },
    helpers: FormikHelpers<{ deckCards: FlipCardFieldValues[] }>,
  ) => {
    alert(JSON.stringify(values));
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
      </FormikCreateDeckWrapper>
    </Container>
  );
};

storiesOf('Core/Formik', module).add(title, Story);
