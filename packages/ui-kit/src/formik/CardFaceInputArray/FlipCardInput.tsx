import * as React from 'react';
import { FlipCardFieldValues } from '@types';
import { useField } from 'formik';
import { Grid } from '@material-ui/core';
import { CardFaceInput } from '../CardFaceInput';
import { FlipCard } from '../../atoms/FlipCard';

type FlipCardInputProps = {
  index: number;
  rotate?: boolean;
};

let typeingTimeout = null;

export const FlipCardInput: React.FC<FlipCardInputProps> = ({ index: i, rotate }) => {
  const backsideRef = React.useRef<HTMLInputElement>();
  const [, , helpers] = useField<FlipCardFieldValues['answer']>(`deckCards.${i}.answer`);

  // TODO:  I think this functionality slows down the form a lot
  //        Must investigate this and convert to fastfield if so
  React.useEffect(() => {
    clearTimeout(typeingTimeout);
    // Make a new timeout set to go off after finish typing
    typeingTimeout = setTimeout(() => {
      helpers.setValue(backsideRef.current.value);
    }, 600);
  }, [backsideRef.current?.value]);

  return (
    <Grid container spacing={2} justify="center">
      <Grid item xs={12}>
        <FlipCard rotate={rotate}>
          <CardFaceInput name={`deckCards.${i}.front`} />
          <CardFaceInput name={`deckCards.${i}.back`} backsideRef={backsideRef} />
        </FlipCard>
      </Grid>
    </Grid>
  );
};
