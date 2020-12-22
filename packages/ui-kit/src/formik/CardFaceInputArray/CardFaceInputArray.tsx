import * as React from 'react';
import { FlipCardFieldValues } from '@types';
import { initialCardValues } from '../FormikCreateDeckWrapper';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { FieldArray, useField } from 'formik';
import { TextField } from '../TextField';
import { LessonDeckTransitions } from '../../transitions/LessonDeckTransitions';
import { FlipCardInput } from './FlipCardInput';
import { NavigationButtons } from './NavigationButtons';
import { FlipCardSizing } from '../../definitions';
import { CircleButton } from '../../atoms/Buttons';
import { pop, shift } from '../../definitions/deckShift';

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

  const [{ value: deckCards }, , helpers] = useField<FlipCardFieldValues[]>('deckCards');
  const totalCards = deckCards.length;
  const [topCardIndex, setTopCardIndex] = React.useState(0);
  const [cardIndexOrder, setCardIndexOrder] = React.useState(deckCards.map(({ cardId }) => cardId));

  const [rotate, setRotate] = React.useState<{ [key: string]: boolean }>({});

  const handleRotateCard = (i: number) => {
    const newRotate = { ...rotate };
    newRotate[i] = !newRotate[i];
    setRotate(newRotate);
  };
  const handleRemoveCard = (i: number) => {
    const newRotate = { ...rotate };
    delete newRotate[i];
    setRotate(newRotate);
  };

  const handleTopCardChange = (next) => {
    let cardOrder = [...cardIndexOrder];
    if (next) cardOrder = pop(cardOrder);
    else cardOrder = shift(cardOrder);
    const tci = deckCards.map(({ cardId }) => cardId).indexOf(cardOrder[0]);
    setTopCardIndex(tci);
    setCardIndexOrder([...cardOrder]);
  };

  return (
    <FieldArray name="deckCards">
      {(arrayHelpers) => (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <div className={cs.deckWrapper}>
              <div className={cs.deckContainer}>
                {deckCards.map(({ cardId }, i) => (
                  <LessonDeckTransitions key={i} index={i} topCardIndex={cardIndexOrder[0]}>
                    <FlipCardInput index={i} rotate={rotate[cardId]} />
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
              <CircleButton
                iconName="bin"
                colour="red"
                onClick={() => {
                  handleRemoveCard(topCardIndex);
                  arrayHelpers.remove(topCardIndex);
                }}
              />
            </div>
          </Grid>

          <>
            <NavigationButtons
              {...{
                topCardIndex,
                totalCards,
              }}
              handleRotate={() => handleRotateCard(topCardIndex)}
              gotoPreviousCard={() => handleTopCardChange(-1)}
              gotoNextCard={() => handleTopCardChange(1)}
              addNewCard={() => arrayHelpers.push(initialCardValues)}
            />
          </>
        </Grid>
      )}
    </FieldArray>
  );
};
