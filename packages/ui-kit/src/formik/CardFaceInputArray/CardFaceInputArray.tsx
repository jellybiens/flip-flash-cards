import * as React from 'react';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { FlipCardFieldValues } from '@types';
import { FieldArray, useFormikContext } from 'formik';
import { TextField } from '../TextField';
import { LessonDeckTransitions } from '../../transitions/LessonDeckTransitions';
import { FlipCardInput } from './FlipCardInput';
import { NavigationButtons } from './NavigationButtons';
import { FlipCardSizing } from '../../definitions';
import { CircleButton } from '../../atoms/Buttons';

const useStyles = makeStyles((theme: Theme) => {
  return {
    deckWrapper: { position: 'relative', height: 'fit-content', width: '100%' },
    deckContainer: { position: 'relative', margin: 'auto', ...FlipCardSizing(theme) },
    correctAnswerWrapper: {
      display: 'flex',
      width: '100%',
    },
    correctAnswerContainer: {
      margin: `${theme.spacing(2.5)}px auto`,
    },
  };
});

export const CardFaceInputArray: React.FC = () => {
  const cs = useStyles();
  const [rotate, setRotate] = React.useState<boolean[]>([]);

  const [topCardIndex, setTopCardIndex] = React.useState(0);
  const {
    values: { deckCards },
  } = useFormikContext<{ deckCards: FlipCardFieldValues[] }>();
  const totalCards = deckCards.length;

  return (
    <FieldArray name="deckCards">
      {(arrayHelpers) => (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <div className={cs.deckWrapper}>
              <div className={cs.deckContainer}>
                {deckCards.map((_, i) => (
                  <LessonDeckTransitions key={i} index={i} topCardIndex={topCardIndex}>
                    <FlipCardInput index={i} rotate={rotate[i]} />
                  </LessonDeckTransitions>
                ))}
              </div>
              <div className={cs.correctAnswerWrapper}>
                <div className={cs.correctAnswerContainer}>
                  <TextField
                    fullWidth
                    label="Correct Answer"
                    name={`deckCards.${topCardIndex}.answer`}
                    variant="outlined"
                  />
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} md={6} container spacing={2}>
            <Grid item xs={12}>
              <CircleButton
                iconName="rotate"
                colour="cyan"
                onClick={() => {
                  const newRotate = [...rotate];
                  newRotate[topCardIndex] = !newRotate[topCardIndex];
                  setRotate(newRotate);
                }}
              />
            </Grid>
          </Grid>

          <>
            <NavigationButtons {...{ topCardIndex, setTopCardIndex, totalCards, arrayHelpers }} />
          </>
        </Grid>
      )}
    </FieldArray>
  );
};
