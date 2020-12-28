import * as React from 'react';
import { CardDeck } from './CardDeck';
import { CardAction } from '../definitions/cardDeck';
import { FlipCardProps } from '@types';

type ChallengeDeckProps = {
  deckCards: FlipCardProps[];
};

export const ChallengeDeck: React.FC<ChallengeDeckProps> = ({ deckCards }) => {
  const totalCards = deckCards.length;
  const [topCardIndex, setTopCardIndex] = React.useState(0);
  const [topCardId, setTopCardId] = React.useState(deckCards[0].cardId);

  const [action, setAction] = React.useState<CardAction>('right');
  const [rotate, setRotate] = React.useState<{ [key: string]: boolean }>({});

  // const handleRotateCard = (i: string) => {
  //   const newRotate = { ...rotate };
  //   newRotate[i] = !rotate[i];
  //   setRotate({ ...newRotate });
  // };

  const setTopCard = (dir: CardAction) => {
    setAction(dir);

    if (topCardIndex === totalCards - 1) {
      // TODO: end deck function
    } else {
      setTopCardIndex(topCardIndex + 1);
      setTopCardId(deckCards[topCardIndex + 1].cardId);
    }
  };

  return (
    <>
      <CardDeck type="challenge" {...{ deckCards, topCardIndex, topCardId, rotate, action }} />
      <button onClick={() => setTopCard('left')}>Flick Left</button>
      <button onClick={() => setTopCard('right')}>Flick Right</button>
    </>
  );
};
