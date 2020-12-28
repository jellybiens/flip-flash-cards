import * as React from 'react';
import { FlipCardProps } from '@types';
import { makeStyles, Theme } from '@material-ui/core';
import { TransitionProps } from 'react-transition-group/Transition';
import { FlipCardSizing } from '../definitions';
import { LoopingDeckTransition } from '../transitions/LoopingDeckTransition';
import { LinearDeckTransition } from '../transitions/LinearDeckTransition';
import { FlipCardInput } from '../formik/FlipCardInput';
import { FlipCard } from './FlipCard';
import { CardAction } from '../definitions/cardDeck';

const useStyles = makeStyles((theme: Theme) => {
  return {
    deckWrapper: {
      position: 'relative',
      margin: 'auto',
      height: 'fit-content',
      width: '100%',
      ...FlipCardSizing(theme),
    },
    deckContainer: { position: 'relative' },
    nextCardContainer: {
      position: 'absolute',
    },
    removeTransitionBelow: {
      zIndex: 10,
      '& div': { transition: 'unset !important' },
    },
  };
});

type CardDeckProps = {
  deckCards: FlipCardProps[];
  topCardIndex: number; // used for setting the card to be seen behind the current
  topCardId: string;
  rotate: { [key: string]: boolean };
  action: CardAction;
  type: 'challenge' | 'review' | 'input';
  DeckTransitionProps?: Partial<TransitionProps>;
};

export const CardDeck: React.FC<CardDeckProps> = ({
  deckCards,
  topCardIndex: tci,
  topCardId,
  rotate,
  action,
  type,
  DeckTransitionProps,
}) => {
  const cs = useStyles();

  const cardBehindTop = (() => {
    const i = tci + 1 === deckCards.length ? 0 : tci + 1;
    if (type === 'review' || type === 'challenge') {
      return (
        <FlipCard
          className={cs.removeTransitionBelow}
          rotate={rotate[deckCards[i].cardId]}
          front={deckCards[i].front}
          back={deckCards[i].back}
        />
      );
    } else {
      return (
        <>
          <FlipCardInput
            className={cs.removeTransitionBelow}
            index={i}
            rotate={rotate[deckCards[i].cardId]}
          />
        </>
      );
    }
  })();

  const DeckTransition = type === 'challenge' ? LinearDeckTransition : LoopingDeckTransition;

  return (
    <div className={cs.deckWrapper}>
      <div className={cs.deckContainer}>
        {type !== 'challenge' && <div className={cs.nextCardContainer}>{cardBehindTop}</div>}
        {deckCards.map(({ cardId, front, back }, i) => (
          <DeckTransition
            key={cardId}
            index={cardId}
            topCardIndex={topCardId}
            action={action}
            {...(!!DeckTransitionProps && DeckTransitionProps)}
          >
            {type !== 'input' ? (
              <FlipCard rotate={rotate[cardId]} front={front} back={back} />
            ) : (
              <FlipCardInput index={i} rotate={rotate[cardId]} />
            )}
          </DeckTransition>
        ))}
      </div>
    </div>
  );
};
