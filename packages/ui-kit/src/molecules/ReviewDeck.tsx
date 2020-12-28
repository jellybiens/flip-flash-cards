import * as React from 'react';
import { CardDeck } from '../molecules/CardDeck';
import { CardAction } from '../definitions/cardDeck';
import { FlipCardProps } from '@types';

type ReviewDeckProps = {
  deckCards: FlipCardProps[];
};

export const ReviewDeck: React.FC<ReviewDeckProps> = ({ deckCards }) => {
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

  const [keyDownTimeout, setKeyDownTimeout] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    // cleanup this component
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [topCardIndex, rotate, keyDownTimeout]);

  const handleKeyPress = (e: KeyboardEvent) => {
    e.preventDefault();
    switch (e.key) {
      case ' ': {
        handleRotateCard(topCardId);
        break;
      }
      case 'ArrowRight': {
        if (keyDownTimeout) break;
        setTopCard(1);
        const nextIndex = topCardIndex + 1 === totalCards ? 0 : topCardIndex + 1;
        setTopCardIndex(nextIndex);
        break;
      }
      case 'ArrowLeft': {
        if (keyDownTimeout) break;
        setTopCard(-1);
        const nextIndex = topCardIndex + 1 === totalCards ? 0 : topCardIndex + 1;
        setTopCardIndex(nextIndex);
        break;
      }
    }
  };

  return (
    <div onClick={() => handleRotateCard(topCardId)}>
      <CardDeck
        type="review"
        {...{ deckCards, topCardIndex, topCardId, rotate, action }}
        DeckTransitionProps={{
          onExiting: () => setKeyDownTimeout(true),
          onExited: () => setKeyDownTimeout(false),
        }}
      />
    </div>
  );
};
