import * as React from 'react';
import { FlipCardFieldValues } from '@types';
import { initialCardValues } from '../FormikCreateDeckWrapper';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { ArrayHelpers, FieldArray, useField } from 'formik';
import { TextField } from '../TextField';
import { CardAction, LessonDeckTransitions } from '../../transitions/LessonDeckTransitions';
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
    nextCardContainer: {
      position: 'absolute',
      margin: 'auto',
      ...FlipCardSizing(theme),
    },
  };
});

export const CardFaceInputArray: React.FC = () => {
  const cs = useStyles();

  const [{ value: deckCards }] = useField<FlipCardFieldValues[]>('deckCards');
  const totalCards = deckCards.length;
  const [topCardIndex, setTopCardIndex] = React.useState(0);
  const [topCardId, setTopCardId] = React.useState(deckCards[0].cardId);

  const [action, setAction] = React.useState<CardAction>('next');

  const [rotate, setRotate] = React.useState<{ [key: string]: boolean }>({});
  const handleRotateCard = (i: string) => {
    const newRotate = { ...rotate };
    newRotate[i] = !rotate[i];
    setRotate({ ...newRotate });
  };

  const handleRemoveCard = (i: number, arrayHelpers: ArrayHelpers) => {
    const newRotate = { ...rotate };
    delete newRotate[i];
    setRotate(newRotate);

    const cardIndex = Math.floor(topCardIndex);

    setTopCardId(deckCards[cardIndex + 1].cardId);
    setTimeout(() => arrayHelpers.remove(cardIndex), 500);
  };

  const setTopCard = (i: number) => {
    setAction(i === 1 ? 'next' : 'prev');

    setTopCardIndex(topCardIndex + i);
    setTopCardId(deckCards[topCardIndex + i].cardId);
  };

  const addNewCard = (arrayHelpersPush: ArrayHelpers['push']) => {
    const newCard = initialCardValues();
    arrayHelpersPush(newCard);
    setTopCardId(newCard.cardId);
    setTopCardIndex(topCardIndex + 1);
  };

  return (
    <FieldArray name="deckCards">
      {(arrayHelpers) => (
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <div className={cs.deckWrapper}>
              <div className={cs.deckContainer}>
                <div className={cs.nextCardContainer}>
                  {topCardIndex + 1 === deckCards.length ? (
                    <FlipCardInput index={0} rotate={rotate[deckCards[0].cardId]} />
                  ) : (
                    <FlipCardInput
                      index={topCardIndex + 1}
                      rotate={rotate[deckCards[topCardIndex + 1].cardId]}
                    />
                  )}
                </div>
                {deckCards.map(({ cardId }, i) => (
                  <LessonDeckTransitions
                    key={cardId}
                    index={cardId}
                    topCardIndex={topCardId}
                    cardAction={action}
                  >
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
                  handleRemoveCard(topCardIndex, arrayHelpers);
                }}
              />
            </div>
          </Grid>

          <>
            <NavigationButtons
              topCardIndex={topCardIndex}
              totalCards={totalCards}
              handleRotate={() => handleRotateCard(topCardId)}
              gotoPreviousCard={() => setTopCard(-1)}
              gotoNextCard={() => setTopCard(1)}
              addNewCard={() => addNewCard(arrayHelpers.push)}
            />
          </>
        </Grid>
      )}
    </FieldArray>
  );
};
