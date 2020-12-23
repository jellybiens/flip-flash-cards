import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import { Transition } from 'react-transition-group';
import { TransitionProps } from 'react-transition-group/Transition';

const MS = 700;
const S_IN = `${MS / 950}`;
const S_OUT = `${MS / 1000}`;

const useStyles = makeStyles(() => {
  return {
    transitionInner: { position: 'absolute', height: '100%', width: '100%' },

    in: { animation: '' },
    'prev-entering': { animation: `$shuffle ease ${S_IN}s` },

    'next-exiting': {
      animation: `$shuffle ease ${S_OUT}s`,
      animationDirection: 'reverse',
    },

    '@keyframes shuffle': {
      '0%': { zIndex: 0, transform: 'translateX(0px) rotate(0deg) scale(0.9)' },
      '49.5%': { zIndex: 0, transform: 'translateX(110%) rotate(35deg) scale(0.95)' },
      '50.5%': { zIndex: 100, transform: 'translateX(110%) rotate(35deg) scale(1)' },
      '100%': { zIndex: 100, transform: 'translateX(0px) rotate(0deg) scale(1)' },
    },
  };
});

export type CardAction = 'next' | 'prev' | 'remove' | 'create';

type LessonDeckTransitionsProps = Omit<TransitionProps, 'timeout'> & {
  index: string;
  topCardIndex: string;
  cardAction: CardAction;
};

export const LessonDeckTransitions: React.FC<LessonDeckTransitionsProps> = ({
  index: i,
  topCardIndex: tci,
  cardAction: action,
  children,
  ...props
}) => {
  const cs = useStyles();

  return (
    <Transition
      appear
      in={i === tci}
      // duration={{
      //   exit: MS,
      // }}
      // timeout={{
      //   exit: MS,
      // }}
      duration={MS}
      timeout={MS}
      mountOnEnter
      unmountOnExit
      {...props}
    >
      {(state) => {
        console.log(tci, `${action}-${state}`);
        return (
          <div className={clsx(cs.transitionInner, cs.in, cs[`${action}-${state}`])}>
            {children}
          </div>
        );
      }}
    </Transition>
  );
};
