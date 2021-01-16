import * as React from 'react';
import { FlipCardFieldValues } from '@types';
import { initialCardValues } from './FormikCreateDeckWrapper';
import { Grid, makeStyles } from '@material-ui/core';
import { ArrayHelpers, FieldArray, useField } from 'formik';
import { NavigationButtons } from '../molecules/NavigationButtons';
import { CardDeck } from '../molecules/CardDeck';
import { CardAction } from '../definitions/cardDeck';

const useStyles = makeStyles(() => {
  return {
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
  const [topCardId, setTopCardId] = React.useState(deckCards[0]._id);

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
      setTopCardId(deckCards[totalCards - 1]._id);
    } else if (topCardIndex === totalCards - 1 && dir === 1) {
      setTopCardIndex(0);
      setTopCardId(deckCards[0]._id);
    } else {
      setTopCardIndex(topCardIndex + dir);
      setTopCardId(deckCards[topCardIndex + dir]._id);
    }
  };

  const addNewCard = (arrayHelpersPush: ArrayHelpers['push']) => {
    const newCard = initialCardValues();
    arrayHelpersPush(newCard);
    setAction('next');
    setTopCardIndex(totalCards);
    setTopCardId(newCard._id);
  };

  const handleRemoveCard = (i: number, { remove }: ArrayHelpers) => {
    setAction('remove');

    const newRotate = { ...rotate };
    delete newRotate[i];
    setRotate(newRotate);

    const cardIndex = Math.floor(topCardIndex);

    if (cardIndex + 1 === totalCards) {
      setTopCardId(deckCards[0]._id);
      setTopCardIndex(0);
    } else {
      setTopCardId(deckCards[cardIndex + 1]._id);
    }
    setTimeout(() => remove(cardIndex), 700);
  };

  return (
    <FieldArray name="deckCards">
      {(arrayHelpers) => (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <CardDeck
              type="input"
              {...{ deckCards, topCardIndex, topCardId, rotate, action }}
            />
          </Grid>
          <Grid item xs={12} className={cs.buttonsWrapper}>
            <NavigationButtons
              creatingDeck
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
