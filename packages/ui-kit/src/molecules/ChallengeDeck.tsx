import * as React from 'react';
import { CardDeck } from './CardDeck';
import { CardAction } from '../definitions/cardDeck';
import { FlipCardProps } from '@types';
import { Grid } from '@material-ui/core';
import {
  ChallengeDeckInput,
  MultipleChoiceAnswerButtons,
} from './MultipleChoiceAnswerButtons';

type ChallengeDeckProps = {
  deckCards: FlipCardProps[];
  difficulty: 'easy' | 'hard';
  handleReportFinalScore: (score) => void;
};

export const ChallengeDeck: React.FC<ChallengeDeckProps> = ({
  deckCards,
  difficulty,
  handleReportFinalScore,
}) => {
  const [score, setScore] = React.useState(0);

  const totalCards = deckCards.length;
  const [topCardIndex, setTopCardIndex] = React.useState(0);
  const [topCardId, setTopCardId] = React.useState(deckCards[0].cardId);

  const [action, setAction] = React.useState<CardAction>('right');
  const [rotate, setRotate] = React.useState<{ [key: string]: boolean }>({});

  const handleRotateCard = (i: string) => {
    const newRotate = { ...rotate };
    newRotate[i] = true;
    setRotate({ ...newRotate });
  };

  const setTopCard = (dir: CardAction) => {
    setAction(dir);

    if (topCardIndex === totalCards - 1) {
      setTopCardId('');
      handleReportFinalScore(score);
    } else {
      setTopCardIndex(topCardIndex + 1);
      setTopCardId(deckCards[topCardIndex + 1].cardId);
    }
  };

  const revealAnswer = (answer: boolean) => {
    handleRotateCard(deckCards[topCardIndex].cardId);

    setTimeout(() => {
      if (answer) {
        setScore(score + 1);
        setTopCard('right');
      } else {
        setTopCard('left');
      }
    }, 1500);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CardDeck
          type="challenge"
          {...{ deckCards, topCardIndex, topCardId, rotate, action }}
        />
      </Grid>

      {difficulty === 'hard' && (
        <ChallengeDeckInput
          revealAnswer={revealAnswer}
          answerText={deckCards[topCardIndex].back.text}
        />
      )}

      {difficulty === 'easy' && (
        <MultipleChoiceAnswerButtons
          cardIndex={topCardIndex}
          deckCards={deckCards}
          revealAnswer={revealAnswer}
        />
      )}
    </Grid>
  );
};
