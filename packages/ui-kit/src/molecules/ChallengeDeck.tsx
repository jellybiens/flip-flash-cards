import * as React from 'react';
import { FlipCardProps } from '@types';
import { makeStyles, Theme } from '@material-ui/core';
import { ChallengeDeckTransitions } from '../transitions/ChallengeDeckTransitions';
import { FlipCard } from '../molecules/FlipCard';

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      position: 'relative',
      margin: 'auto',
    },
  };
});

type ChallengeDeckProps = {
  deck: FlipCardProps[];
};

// TODO: seperate into 2 decks, EXAM and PRACTISE
//
// EXAM will have no keyboard controls for the flipping and
// swiping of cards, it will be done based on the parent telling
// the deck if the user got a wrong or right answer based on and input
// the deck will also end after input of the final card
//
// PRACTISE will have keyboard inputs to navigate through the deck
// and to flip the cards
// It will also rotate through the deck, once at the final card, the
// first card will be shown again, navigation will go backwards and
// forwards through the deck also ( perhaps an option to shuffle? )
// also flipCard setRotate event will be applied to the deck state
//
export const ChallengeDeck: React.FC<ChallengeDeckProps> = ({ deck }) => {
  const cs = useStyles();
  const [rotate, setRotate] = React.useState<boolean[]>([]);
  const [topCardIndex, setTopCardIndex] = React.useState<number>(0);
  const [keyDownTimeout, setKeyDownTimeout] = React.useState(false);
  const [direction, setDirection] = React.useState<'right' | 'left'>('right');

  const setNewDirection = (dir) => {
    setDirection(dir);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    e.preventDefault();
    switch (e.key) {
      case ' ': {
        const newRotate = [...rotate];
        newRotate[topCardIndex] = !newRotate[topCardIndex];
        setRotate(newRotate);
        break;
      }
      case 'ArrowRight': {
        if (keyDownTimeout) break;
        setNewDirection('right');
        const nextIndex = topCardIndex + 1 === deck.length ? 0 : topCardIndex + 1;
        setTopCardIndex(nextIndex);
        break;
      }
      case 'ArrowLeft': {
        if (keyDownTimeout) break;
        setNewDirection('left');
        const nextIndex = topCardIndex + 1 === deck.length ? 0 : topCardIndex + 1;
        setTopCardIndex(nextIndex);
        break;
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);

    // cleanup this component
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [topCardIndex, rotate, keyDownTimeout]);

  return (
    <div className={cs.root}>
      {deck.map(({ ...props }, i) => {
        return (
          <ChallengeDeckTransitions
            index={i}
            topCardIndex={topCardIndex}
            direction={direction}
            onExiting={() => setKeyDownTimeout(true)}
            onExited={() => setKeyDownTimeout(false)}
          >
            {i}
            <FlipCard rotate={rotate[i]} {...props} />
          </ChallengeDeckTransitions>
        );
      })}
    </div>
  );
};
