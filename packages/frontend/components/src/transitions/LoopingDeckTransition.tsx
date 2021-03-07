import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import { Transition } from 'react-transition-group';
import { TransitionProps } from 'react-transition-group/Transition';
import { CardAction } from '../definitions/cardDeck';

const MS = 700;
const S_IN = `${MS / 950}`;
const S_OUT = `${MS / 1000}`;

const useStyles = makeStyles(() => {
  return {
    transitionInner: { position: 'absolute', height: '100%', width: '100%' },

    in: { animation: 'unset', zIndex: 10 },
    'prev-entering': { animation: `$shuffle ease ${S_IN}s` },

    'next-exiting': {
      zIndex: 5,
      animation: `$shuffle ease ${S_OUT}s`,
      animationDirection: 'reverse',
    },

    'next-entering': {
      zIndex: 10,
    },
    'prev-exiting': {
      zIndex: 10,
    },

    '@keyframes shuffle': {
      '0%': { zIndex: 5, transform: 'translateX(0px) rotate(0deg) scale(0.9)' },
      '49.5%': { zIndex: 5, transform: 'translateX(150%) rotate(35deg) scale(0.95)' },
      '50.5%': { zIndex: 100, transform: 'translateX(150%) rotate(35deg) scale(1)' },
      '100%': { zIndex: 100, transform: 'translateX(0px) rotate(0deg) scale(1)' },
    },

    'remove-exiting': {
      animation: `$remove ease ${S_OUT}s`,
    },

    '@keyframes remove': {
      '0%': { zIndex: 100, opacity: 1, transform: 'translate(0, 0px)' },
      '100%': { zIndex: 100, opacity: 0, transform: 'translate(0, -50px)' },
    },
  };
});

type LoopingDeckTransitionProps = Omit<TransitionProps, 'timeout'> & {
  index: string;
  topCardIndex: string;
  action: CardAction;
};

export const LoopingDeckTransition: React.FC<LoopingDeckTransitionProps> = ({
  index: i,
  topCardIndex: tci,
  action,
  children,
  ...props
}) => {
  const cs = useStyles();

  return (
    <Transition
      in={i === tci}
      duration={MS}
      timeout={MS}
      mountOnEnter
      unmountOnExit
      {...props}
    >
      {(state) => (
        <div className={clsx(cs.transitionInner, cs.in, cs[`${action}-${state}`])}>
          {children}
        </div>
      )}
    </Transition>
  );
};
