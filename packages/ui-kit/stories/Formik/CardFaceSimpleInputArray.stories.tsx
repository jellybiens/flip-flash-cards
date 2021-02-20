import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Container, FormikStateValues } from '../helpers';
import { FormikCreateDeckWrapper, FlipCardSimpleInputArray } from '@ui-kit';
import { FlipCardFieldValues } from '@types';
import { FormikHelpers } from 'formik';
import { initialCardValues } from './CardFaceInputArray.stories';

const title = 'CardFaceSimpleInputArray';

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
