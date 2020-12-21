import * as React from 'react';
import clsx from 'clsx';
import { CardPixels, FlipCardFieldValues } from '@types';
import { useField } from 'formik';
import { makeStyles, Grid } from '@material-ui/core';
import { CardFaceInput } from '../CardFaceInput';
import { FlipCard } from '../../atoms/FlipCard';
import useWindowSize from '../../definitions/useWindowSize';
import useViewportSize from '../../definitions/useViewportSize';

const useStyles = makeStyles(() => {
  return {
    root: { transform: 'scale(0.7)' },
  };
});

type DoubleCardFaceInputProps = {
  index: number;
  rotate: boolean;
};

let typeingTimeout = null;

export const DoubleCardFaceInput: React.FC<DoubleCardFaceInputProps> = ({ index: i, rotate }) => {
  const cs = useStyles();
  const { width } = useWindowSize();
  const vps = useViewportSize();
  const sideBySide = CardPixels[vps] * 2.5 > width;

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
      {sideBySide ? (
        <Grid item xs={12}>
          <FlipCard rotate={rotate}>
            <CardFaceInput name={`deckCards.${i}.front`} />
            <CardFaceInput name={`deckCards.${i}.back`} backsideRef={backsideRef} />
          </FlipCard>
        </Grid>
      ) : (
        <>
          <Grid item xs={6}>
            <FlipCard className={clsx({ [cs.root]: vps === 'lg' || vps === 'xl' })}>
              <CardFaceInput name={`deckCards.${i}.front`} />
              <></>
            </FlipCard>
          </Grid>
          <Grid item xs={6}>
            <FlipCard className={clsx({ [cs.root]: vps === 'lg' || vps === 'xl' })}>
              <CardFaceInput name={`deckCards.${i}.back`} backsideRef={backsideRef} />
              <></>
            </FlipCard>
          </Grid>
        </>
      )}
    </Grid>
  );
};
