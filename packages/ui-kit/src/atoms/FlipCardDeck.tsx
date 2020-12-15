import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import { Transition } from 'react-transition-group';
import { FlipCard, FlipCardProps } from './FlipCard';
import { CardSize } from '@types';

const MS = 500;
const S = `${MS / 1000}`;

const useStyles = makeStyles(() => {
  return {
    root: { position: 'absolute' },

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
  size: CardSize;
};

export const FlipCardDeck: React.FC<FlipCardDeckProps> = ({ deck, size }) => {
  const cs = useStyles();
  const [topCardIndex, setTopCardIndex] = React.useState<number>(0);
  const [direction, setDirection] = React.useState<'right' | 'left' | 'behind' | ''>('');

  const setNewDirection = (dir) => {
    setDirection(dir);
    setTimeout(() => setDirection(''), MS);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowRight': {
        setNewDirection('right');
        setTopCardIndex(topCardIndex + 1);
        break;
      }
      case 'ArrowLeft': {
        setNewDirection('left');
        setTopCardIndex(topCardIndex + 1);
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
  }, [topCardIndex]);

  return (
    <>
      {deck.map(({ ...props }, i) => {
        return (
          <Transition
            appear
            key={i}
            className={cs.root}
            in={i === topCardIndex}
            duration={{
              exit: MS,
            }}
            timeout={{
              exit: MS,
            }}
            mountOnEnter
            unmountOnExit
          >
            {(state) => (
              <div
                className={clsx(
                  cs.root,
                  cs.fadeIn,
                  cs[`fadeIn-${state}`],
                  cs[`swipeOut-${state}${direction}`],
                )}
              >
                <FlipCard {...props} size={size} />
              </div>
            )}
          </Transition>
        );
      })}
    </>
  );
};
