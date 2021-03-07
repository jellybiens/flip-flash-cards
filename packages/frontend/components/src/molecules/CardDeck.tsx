import * as React from 'react';
import { FlipCardProps } from '@types';
import { makeStyles, Theme } from '@material-ui/core';
import { TransitionProps } from 'react-transition-group/Transition';
import { FlipCardSizing } from '../definitions';
import { LoopingDeckTransition } from '../transitions/LoopingDeckTransition';
import { LinearDeckTransition } from '../transitions/LinearDeckTransition';
import { FlipCardInput, FrontBackViewOption } from '../formik/FlipCardInput';
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
  const [inputFacesView, setInputFacesView] = React.useState<{
    [key: string]: FrontBackViewOption;
  }>({});

  const handleSetFacesViewOption = (views: FrontBackViewOption, key: string) => {
    const allViews = { ...inputFacesView };
    allViews[key] = views;
    setInputFacesView(allViews);
  };
  const cardBehindTop = (() => {
    const i = tci + 1 === deckCards.length ? 0 : tci + 1;
    if (type === 'review' || type === 'challenge') {
      return (
        <FlipCard
          className={cs.removeTransitionBelow}
          rotate={rotate[deckCards[i]._id]}
          front={deckCards[i].front}
          back={deckCards[i].back}
          colour={deckCards[i].front.colour}
        />
      );
    } else {
      return (
        <>
          <FlipCardInput
            className={cs.removeTransitionBelow}
            index={i}
            rotate={rotate[deckCards[i]._id]}
            colour={deckCards[i].front.colour}
            facesViewOption={
              inputFacesView[deckCards[i]._id] || { front: 'menu', back: 'menu' }
            }
            setFacesViewOption={(views) =>
              handleSetFacesViewOption(views, deckCards[i]._id)
            }
          />
        </>
      );
    }
  })();

  const DeckTransition =
    type === 'challenge' ? LinearDeckTransition : LoopingDeckTransition;

  return (
    <div className={cs.deckWrapper}>
      <div className={cs.deckContainer}>
        {type !== 'challenge' && (
          <div className={cs.nextCardContainer}>{cardBehindTop}</div>
        )}
        {deckCards.map(({ _id, front, back }, i) => (
          <DeckTransition
            key={_id}
            index={_id}
            topCardIndex={topCardId}
            action={action}
            {...(!!DeckTransitionProps && DeckTransitionProps)}
          >
            {type !== 'input' ? (
              <FlipCard
                rotate={rotate[_id]}
                front={front}
                back={back}
                colour={deckCards[i].front.colour}
              />
            ) : (
              <FlipCardInput
                index={i}
                rotate={rotate[_id]}
                colour={deckCards[i].front.colour}
                facesViewOption={
                  inputFacesView[deckCards[i]._id] || { front: 'menu', back: 'menu' }
                }
                setFacesViewOption={(views) =>
                  handleSetFacesViewOption(views, deckCards[i]._id)
                }
              />
            )}
          </DeckTransition>
        ))}
      </div>
    </div>
  );
};
