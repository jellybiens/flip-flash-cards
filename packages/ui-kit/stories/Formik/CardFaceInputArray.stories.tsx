import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Container } from '../helpers';
import { FormikCreateDeckWrapper, CardFaceInputArray } from '@ui-kit';
import { FlipCardFieldValues } from '@types';

const title = 'CardFaceInputArray';

const initialCardValues: FlipCardFieldValues[] = [
  {
    cardId: 123,
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
    answer: '',
  },
  {
    cardId: 234,
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
    answer: '',
  },
  {
    cardId: 345,
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
    answer: '',
  },
  {
    cardId: 456,
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
    answer: '',
  },
];

const Story = () => {
  const handleSubmit = (values) => Promise.resolve(console.log(JSON.stringify(values, null, 2)));

  return (
    <Container title={title}>
      <FormikCreateDeckWrapper initialValues={initialCardValues} onSubmit={handleSubmit}>
        <CardFaceInputArray />
      </FormikCreateDeckWrapper>
    </Container>
  );
};

storiesOf('Core/Formik', module).add(title, Story);
