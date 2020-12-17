import * as React from 'react';
import clsx from 'clsx';
import { makeStyles, Theme } from '@material-ui/core';
import { Transition } from 'react-transition-group';
import { FlipCard, FlipCardProps } from './FlipCard';
import { FlipCardSizing } from '../definitions';

const MS = 500;
const S = `${MS / 1000}`;

const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {
      position: 'relative',
      margin: 'auto',
      ...FlipCardSizing(theme),
    },

    transitionWrapper: { position: 'absolute', height: '100%', width: '100%' },
    transitionInner: { position: 'absolute', height: '100%', width: '100%' },

    fadeIn: { animation: '' },
    'fadeIn-entering': { opacity: 0, transform: 'translateY(40px)' },
    'fadeIn-entered': { animation: `$fadeIn ease ${S}s` },

    '@keyframes fadeIn': {
      '0%': { opacity: 0, transform: 'translateY(40px)' },
      '100%': { opacity: 1, transform: 'translateY(0px)' },
    },

    'swipeOut-exiting': {
      opacity: 0,
      transform: 'translate(0vw, 0px) rotate(0deg)',
    },
    'swipeOut-exitingright': {
      animation: `$rightSwipe ease ${S}s`,
    },
    'swipeOut-exitingleft': {
      animation: `$leftSwipe ease ${S}s`,
    },

    '@keyframes rightSwipe': {
      '0%': { opacity: 1, transform: 'translate(0vw, 0px) rotate(0deg)' },
      '100%': { opacity: 0, transform: 'translate(200%, -20%) rotate(30deg)' },
    },
    '@keyframes leftSwipe': {
      '0%': { opacity: 1, transform: 'translate(0vw, 0px) rotate(0deg)' },
      '100%': { opacity: 0, transform: 'translate(-200%, -20%) rotate(-30deg)' },
    },
  };
});

type FlipCardDeckProps = {
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
export const FlipCardDeck: React.FC<FlipCardDeckProps> = ({ deck }) => {
  const cs = useStyles();
  const [rotate, setRotate] = React.useState<boolean[]>([]);
  const [topCardIndex, setTopCardIndex] = React.useState<number>(0);
  const [keyDownTimeout, setKeyDownTimeout] = React.useState(false);
  const [direction, setDirection] = React.useState<'right' | 'left' | ''>('');

  const setNewDirection = (dir) => {
    setDirection(dir);
    setTimeout(() => {
      setDirection('');
    }, MS);
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
          <Transition
            appear
            key={i}
            className={cs.transitionWrapper}
            in={i === topCardIndex}
            duration={{
              exit: MS,
            }}
            timeout={{
              exit: MS,
            }}
            mountOnEnter
            unmountOnExit
            onExiting={() => setKeyDownTimeout(true)}
            onExited={() => setKeyDownTimeout(false)}
          >
            {(state) => (
              <div
                className={clsx(
                  cs.transitionInner,
                  cs.fadeIn,
                  cs[`fadeIn-${state}`],
                  cs[`swipeOut-${state}${direction}`],
                )}
              >
                {i}
                <FlipCard {...props} rotate={rotate[i]} />
              </div>
            )}
          </Transition>
        );
      })}
    </div>
  );
};
