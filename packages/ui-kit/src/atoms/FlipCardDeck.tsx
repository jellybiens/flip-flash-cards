import * as React from 'react';
import { makeStyles, Theme } from '@material-ui/core';
import { FlipCard, FlipCardProps } from './FlipCard';
import { CardSize } from '@types';
import KeyboardEventHandler from 'react-keyboard-event-handler';

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: { position: 'absolute' },
  };
});

type FlipCardDeckProps = {
  deck: Omit<FlipCardProps, 'size'>[];
  size: CardSize;
};

export const FlipCardDeck: React.FC<FlipCardDeckProps> = ({ deck, size }) => {
  const cs = useStyles();
  const [cardIndex, setCardIndex] = React.useState(0);

  const handleKeyPress = () => {
    setTimeout(() => setCardIndex(cardIndex + 1), 500);
  };

  return (
    <>
      <button onClick={() => setCardIndex(cardIndex + 1)}>Next Card</button>
      <KeyboardEventHandler handleKeys={['right', 'left']} onKeyEvent={handleKeyPress} />
      {deck.map(({ ...props }, i) => {
        if (cardIndex !== i) return;
        return (
          <div key={i} className={cs.root}>
            <FlipCard {...props} size={size} />
          </div>
        );
      })}
    </>
  );
};
