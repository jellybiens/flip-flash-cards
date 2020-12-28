import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import { Transition } from 'react-transition-group';
import { TransitionProps } from 'react-transition-group/Transition';
import { CardAction } from '../definitions/cardDeck';

const MS = 500;
const S = `${MS / 1000}`;

const useStyles = makeStyles(() => {
  return {
    transitionWrapper: { position: 'absolute', height: '100%', width: '100%' },

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

type LinearDeckTransitionProps = Omit<TransitionProps, 'timeout'> & {
  index: string;
  topCardIndex: string;
  action: CardAction;
};

export const LinearDeckTransition: React.FC<LinearDeckTransitionProps> = ({
  index: i,
  topCardIndex: tci,
  action,
  children,
  ...props
}) => {
  const cs = useStyles();

  return (
    <Transition
      appear
      key={i}
      className={cs.transitionWrapper}
      in={i === tci}
      duration={{
        exit: MS,
      }}
      timeout={{
        exit: MS,
      }}
      mountOnEnter
      unmountOnExit
      {...props}
    >
      {(state) => (
        <div
          className={clsx(
            cs.transitionWrapper,
            cs.fadeIn,
            cs[`fadeIn-${state}`],
            cs[`swipeOut-${state}${action}`],
          )}
        >
          {children}
        </div>
      )}
    </Transition>
  );
};
