import * as React from 'react';
import { FlipCardFieldValues } from '@types';
import { makeStyles, Theme } from '@material-ui/core';
import { FlipCardSizing } from '../definitions';
import { CardAction, LoopingDeckTransition } from '../transitions/LoopingDeckTransition';
import { FlipCardInput } from '../formik/FlipCardInput';
import { FlipCard } from '../molecules/FlipCard';

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

type LoopingDeckProps = {
  deckCards: FlipCardFieldValues[];
  topCardIndex: number;
  topCardId: string;
  rotate: { [key: string]: boolean };
  action: CardAction;
  type: 'display' | 'input';
};

export const LoopingDeck: React.FC<LoopingDeckProps> = ({
  deckCards,
  topCardIndex: tci,
  topCardId,
  rotate,
  action,
  type,
}) => {
  const cs = useStyles();

  const cardBehindTop = (() => {
    const i = tci + 1 === deckCards.length ? 0 : tci + 1;
    if (type === 'display') {
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

  return (
    <div className={cs.deckWrapper}>
      <div className={cs.deckContainer}>
        <div className={cs.nextCardContainer}>{cardBehindTop}</div>
        {deckCards.map(({ cardId, front, back }, i) => (
          <LoopingDeckTransition
            key={cardId}
            index={cardId}
            topCardIndex={topCardId}
            cardAction={action}
          >
            {type === 'display' ? (
              <FlipCard rotate={rotate[cardId]} front={front} back={back} />
            ) : (
              <FlipCardInput index={i} rotate={rotate[cardId]} />
            )}
          </LoopingDeckTransition>
        ))}
      </div>
    </div>
  );
};
