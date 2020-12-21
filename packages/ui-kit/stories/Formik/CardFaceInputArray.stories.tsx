import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Container } from '../helpers';
import { FormikCreateDeckWrapper, CardFaceInputArray } from '@ui-kit';
import { FlipCardFieldValues } from '@types';

const title = 'CardFaceInputArray';

const initialCardValues: FlipCardFieldValues[] = [
  {
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
