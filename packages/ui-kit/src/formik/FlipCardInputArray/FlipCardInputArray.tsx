import * as React from 'react';
import { CardPixels, FlipCardFieldValues } from '@types';
import { initialCardValues } from '../FormikCreateDeckWrapper';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { ArrayHelpers, FieldArray, useField } from 'formik';
import { CardAction } from '../../transitions/LoopingDeckTransition';
import { NavigationButtons } from './NavigationButtons';
import { FlipCardSizing } from '../../definitions';
import { LoopingDeck } from '../../molecules/LoopingDeck';

const useStyles = makeStyles((theme: Theme) => {
  return {
    nextCardContainer: {
      position: 'absolute',
      margin: 'auto',
      ...FlipCardSizing(theme),
    },
    buttonsWrapper: {
      height: '100%',
      margin: 'auto',
    },
  };
});

export const FlipCardInputArray: React.FC = () => {
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

  const setTopCard = (dir: number) => {
    setAction(dir === 1 ? 'next' : 'prev');

    if (topCardIndex === 0 && dir === -1) {
      setTopCardIndex(totalCards - 1);
      setTopCardId(deckCards[totalCards - 1].cardId);
    } else if (topCardIndex === totalCards - 1 && dir === 1) {
      setTopCardIndex(0);
      setTopCardId(deckCards[0].cardId);
    } else {
      setTopCardIndex(topCardIndex + dir);
      setTopCardId(deckCards[topCardIndex + dir].cardId);
    }
  };

  const addNewCard = (arrayHelpersPush: ArrayHelpers['push']) => {
    const newCard = initialCardValues();
    arrayHelpersPush(newCard);
    setAction('next');
    setTopCardIndex(totalCards);
    setTopCardId(newCard.cardId);
  };

  const handleRemoveCard = (i: number, { remove }: ArrayHelpers) => {
    setAction('remove');

    const newRotate = { ...rotate };
    delete newRotate[i];
    setRotate(newRotate);

    const cardIndex = Math.floor(topCardIndex);

    if (cardIndex + 1 === totalCards) {
      setTopCardId(deckCards[0].cardId);
      setTopCardIndex(0);
    } else {
      setTopCardId(deckCards[cardIndex + 1].cardId);
      setTopCardIndex(cardIndex + 1);
    }
    setTimeout(() => remove(cardIndex), 700);
  };
  //TODO: make grid item full height of card input and margin auto buttons
  // make buttons nicer order and change scale size with new card sizes
  // test error outputs for when info is missing
  // animation different for new card add if possible
  return (
    <FieldArray name="deckCards">
      {(arrayHelpers) => (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <LoopingDeck type="input" {...{ deckCards, topCardIndex, topCardId, rotate, action }} />
          </Grid>
          <Grid item xs={12} className={cs.buttonsWrapper}>
            <NavigationButtons
              topCardIndex={topCardIndex}
              totalCards={totalCards}
              handleRotate={() => handleRotateCard(topCardId)}
              gotoPreviousCard={() => setTopCard(-1)}
              gotoNextCard={() => setTopCard(1)}
              addNewCard={() => addNewCard(arrayHelpers.push)}
              removeCard={() => handleRemoveCard(topCardIndex, arrayHelpers)}
            />
          </Grid>
        </Grid>
      )}
    </FieldArray>
  );
};
