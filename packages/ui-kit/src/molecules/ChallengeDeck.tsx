import * as React from 'react';
import { CardDeck } from './CardDeck';
import { CardAction } from '../definitions/cardDeck';
import { FlipCardProps } from '@types';
import { TextField } from '../formik/TextField';
import { Grid, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  textField: {
    margin: 'auto',
    '& input': { textAlign: 'center' },
  },
}));
type ChallengeDeckProps = {
  deckCards: FlipCardProps[];
};

let typingTimer = undefined;

export const ChallengeDeck: React.FC<ChallengeDeckProps> = ({ deckCards }) => {
  const cs = useStyles();

  const [answer, setAnswer] = React.useState('');

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
      // TODO: end deck function
    } else {
      setTopCardIndex(topCardIndex + 1);
      setTopCardId(deckCards[topCardIndex + 1].cardId);
    }
  };

  const checkAnswer = () => {
    handleRotateCard(deckCards[topCardIndex].cardId);

    const backSideText = deckCards[topCardIndex].back.text;

    setTimeout(() => {
      if (backSideText === answer) setTopCard('right');
      else setTopCard('left');

      setAnswer('');
    }, 1500);
  };

  React.useEffect(() => {
    if (answer) {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(checkAnswer, 2000);
    }
  }, [answer]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CardDeck type="challenge" {...{ deckCards, topCardIndex, topCardId, rotate, action }} />
      </Grid>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className={cs.textField}
        />
      </Grid>
    </Grid>
  );
};
