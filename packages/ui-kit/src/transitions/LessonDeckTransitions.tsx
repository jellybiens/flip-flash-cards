import * as React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import { Transition } from 'react-transition-group';
import { TransitionProps } from 'react-transition-group/Transition';

const MS = 500;
const S = `${MS / 1000}`;

const useStyles = makeStyles(() => {
  return {
    transitionInner: { position: 'absolute', height: '100%', width: '100%' },

    in: { animation: '' },
    'in-entering': { opacity: 0, transform: 'translateX(40px)' },
    'in-entered': { animation: `$in ease ${S}s` },

    '@keyframes in': {
      '0%': { opacity: 0, transform: 'translateX(40px)' },
      '100%': { opacity: 1, transform: 'translateX(0px)' },
    },

    'out-exiting': {
      opacity: 0,
      transform: 'translateX(0px)',
      animation: `$out ease ${S}s`,
    },

    '@keyframes out': {
      '0%': { opacity: 1, transform: 'translateX(0px)' },
      '100%': { opacity: 0, transform: 'translateX(-40px)' },
    },
  };
});

type LessonDeckTransitionsProps = Omit<TransitionProps, 'timeout'> & {
  index: string;
  topCardIndex: string;
};

export const LessonDeckTransitions: React.FC<LessonDeckTransitionsProps> = ({
  index: i,
  topCardIndex: tci,
  children,
  ...props
}) => {
  const cs = useStyles();

  return (
    <Transition
      appear
      in={i === tci}
      duration={MS}
      timeout={{
        exit: MS,
      }}
      mountOnEnter
      unmountOnExit
      {...props}
      // onExiting={() => setKeyDownTimeout(true)}
      // onExited={() => setKeyDownTimeout(false)}
    >
      {(state) => (
        <div className={clsx(cs.transitionInner, cs.in, cs[`in-${state}`], cs[`out-${state}`])}>
          {children}
        </div>
      )}
    </Transition>
  );
};
