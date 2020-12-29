import * as React from 'react';
import { CardDeck } from './CardDeck';
import { CardAction, shuffle } from '../definitions/cardDeck';
import { FlipCardProps } from '@types';
import { TextField } from '../formik/TextField';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { SquareButton } from '../atoms/Buttons';
import { FlipCardSizing } from '../definitions';

const useStyles = makeStyles((theme: Theme) => {
  const fontSizing = {
    [theme.breakpoints.only('xs')]: { fontSize: '0.8em', padding: 5 },
    [theme.breakpoints.only('sm')]: { fontSize: '1.2em', padding: 7 },
    [theme.breakpoints.only('md')]: { fontSize: '1.6em', padding: 9 },
    [theme.breakpoints.only('lg')]: { fontSize: '2em', padding: 11 },
    [theme.breakpoints.only('xl')]: { fontSize: '2.4em', padding: 13 },
  };

  return {
    container: {
      display: 'flex',
    },
    wrapper: {
      height: 'auto !important',
      ...FlipCardSizing(theme),
      margin: 'auto',
    },
    answerTextField: {
      '& input': {
        textAlign: 'center',
        padding: 5,
        ...fontSizing,
      },
    },
    button: {
      ...fontSizing,
    },
    buttonWrapper: {
      margin: 'auto',
      width: '80%',
    },
  };
});
type ChallengeDeckProps = {
  deckCards: FlipCardProps[];
  difficulty: 'easy' | 'hard';
};

export const ChallengeDeck: React.FC<ChallengeDeckProps> = ({ deckCards, difficulty }) => {
  const cs = useStyles();

  const [inputAnswer, setInputAnswer] = React.useState('');

  const totalCards = deckCards.length;
  const [topCardIndex, setTopCardIndex] = React.useState(0);
  const [topCardId, setTopCardId] = React.useState(deckCards[0].cardId);

  const [action, setAction] = React.useState<CardAction>('right');
  const [rotate, setRotate] = React.useState<{ [key: string]: boolean }>({});

  const multipleChoiceAnswers: [string, string, string][] =
    'easy' &&
    deckCards.map((card, i: number) => {
      const randomDeck: FlipCardProps[] = [...deckCards];
      const correctCard = randomDeck.splice(i, 1);
      const correctAnswer = correctCard[0].back.text;

      const rand1 = Math.floor(Math.random() * randomDeck.length);
      const wrongCard1 = randomDeck.splice(rand1, 1);
      const wrongAnswer1 = wrongCard1[0].back.text;

      const rand2 = Math.floor(Math.random() * randomDeck.length);
      const wrongCard2 = randomDeck.splice(rand2, 1);
      const wrongAnswer2 = wrongCard2[0].back.text;

      const answers = shuffle([correctAnswer, wrongAnswer1, wrongAnswer2]);

      return answers as [string, string, string];
    });

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

  const checkAnswer = (answer: string) => {
    handleRotateCard(deckCards[topCardIndex].cardId);

    const backSideText = deckCards[topCardIndex].back.text;
    console.log(backSideText.toLowerCase() === answer.toLowerCase());
    console.log(answer.toLowerCase());
    console.log(backSideText.toLowerCase());
    setTimeout(() => {
      if (backSideText.toLowerCase() === answer.toLowerCase()) setTopCard('right');
      else setTopCard('left');

      setInputAnswer('');
    }, 1500);
  };

  // React.useEffect(() => {
  //   if (answer) {
  //     clearTimeout(typingTimer);
  //     typingTimer = setTimeout(checkAnswer, 2000);
  //   }
  // }, [answer]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CardDeck type="challenge" {...{ deckCards, topCardIndex, topCardId, rotate, action }} />
      </Grid>

      {difficulty === 'hard' && (
        <>
          <Grid item xs={12}>
            <div className={cs.container}>
              <div className={cs.wrapper}>
                <TextField
                  fullWidth
                  variant="outlined"
                  value={inputAnswer}
                  onChange={(e) => setInputAnswer(e.target.value)}
                  className={cs.answerTextField}
                />
              </div>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className={cs.container}>
              <div className={cs.wrapper}>
                <SquareButton
                  fullWidth
                  colour="cyan"
                  onClick={() => checkAnswer(inputAnswer)}
                  className={cs.button}
                >
                  Flip
                </SquareButton>
              </div>
            </div>
          </Grid>
        </>
      )}

      {difficulty === 'easy' && (
        <>
          <Grid item xs={12} md={4}>
            <div className={cs.buttonWrapper}>
              <SquareButton
                fullWidth
                colour="cyan"
                onClick={() => checkAnswer(multipleChoiceAnswers[topCardIndex][0])}
                className={cs.button}
              >
                {multipleChoiceAnswers[topCardIndex][0]}
              </SquareButton>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={cs.buttonWrapper}>
              <SquareButton
                fullWidth
                colour="cyan"
                onClick={() => checkAnswer(multipleChoiceAnswers[topCardIndex][1])}
                className={cs.button}
              >
                {multipleChoiceAnswers[topCardIndex][1]}
              </SquareButton>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div className={cs.buttonWrapper}>
              <SquareButton
                fullWidth
                colour="cyan"
                onClick={() => checkAnswer(multipleChoiceAnswers[topCardIndex][2])}
                className={cs.button}
              >
                {multipleChoiceAnswers[topCardIndex][2]}
              </SquareButton>
            </div>
          </Grid>
        </>
      )}
    </Grid>
  );
};
