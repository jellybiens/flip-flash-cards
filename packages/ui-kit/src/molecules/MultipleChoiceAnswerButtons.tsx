import * as React from 'react';
import clsx from 'clsx';
import levenshtein from 'js-levenshtein';
import { shuffle } from '../definitions/cardDeck';
import { FlipCardProps } from '@types';
import { Grid, makeStyles, Theme } from '@material-ui/core';
import { SquareButton } from '../atoms/Buttons';
import { TextField } from '../formik/TextField';
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
      [theme.breakpoints.down('sm')]: {
        width: '60%',
      },
      [theme.breakpoints.up('md')]: {
        width: '80%',
      },
    },
    'correct-answer': {
      pointerEvents: 'none',
      boxShadow: `${theme.palette.green.dark} 3px 3px 7px, ${theme.palette.green.dark} 3px -3px 7px, ${theme.palette.green.dark} -3px 3px 7px,  ${theme.palette.green.dark} -3px -3px 7px`,
      backgroundColor: theme.palette.green.light,
      '& input': { color: theme.palette.green.main, backgroundColor: theme.palette.white.main },
      animation: `$correct-answer linear 0.1s`,
      transform: 'scale(1.1)',
    },
    'wrong-answer': {
      pointerEvents: 'none',
      boxShadow: `${theme.palette.red.dark} 3px 3px 7px, ${theme.palette.red.dark} 3px -3px 7px, ${theme.palette.red.dark} -3px 3px 7px,  ${theme.palette.red.dark} -3px -3px 7px`,
      backgroundColor: theme.palette.red.light,
      '& input': { color: theme.palette.red.main, backgroundColor: theme.palette.white.main },
      animation: `$wrong-answer linear 0.1s`,
      transform: 'scale(0.9)',
    },
    'dull-option': {
      pointerEvents: 'none',
      animation: `$wrong-answer linear 0.1s`,
      backgroundColor: theme.palette.dull.light,
      transform: 'scale(0.9)',
    },

    '@keyframes correct-answer': {
      '0%': { transform: 'scale(1)' },
      '80%': { transform: 'scale(1.15)' },
      '100%': { transform: 'scale(1.1)' },
    },
    '@keyframes wrong-answer': {
      '0%': { transform: 'scale(1)' },
      '80%': { transform: 'scale(0.85)' },
      '100%': { transform: 'scale(0.9)' },
    },
  };
});

type MultipleChoiceAnswerButtonsProps = {
  cardIndex: number;
  deckCards: FlipCardProps[];
  revealAnswer: (answer) => void;
};

enum ResponseColours {
  'correct-answer' = 'green',
  'wrong-answer' = 'red',
  'dull-option' = 'dull',
  'default' = 'cyan',
}

export const MultipleChoiceAnswerButtons: React.FC<MultipleChoiceAnswerButtonsProps> = ({
  cardIndex,
  deckCards,
  revealAnswer,
}) => {
  const cs = useStyles();

  const defaultAnimationClasses: [string, string, string] = ['default', 'default', 'default'];
  const [animationClasses, setAnimationClasses] = React.useState<[string, string, string]>(
    defaultAnimationClasses,
  );
  const [animatingResponse, setAnimatingResponse] = React.useState(false);

  const [correctAnswer, setCorrectAnswer] = React.useState('');
  const [optionAnswer1, setOptionAnswer1] = React.useState('');
  const [optionAnswer2, setOptionAnswer2] = React.useState('');
  const [optionAnswer3, setOptionAnswer3] = React.useState('');

  React.useEffect(() => {
    const randomDeck: FlipCardProps[] = [...deckCards];
    const correctCard = randomDeck.splice(cardIndex, 1);
    const correctAnswer = correctCard[0].back.text;
    setCorrectAnswer(correctAnswer);

    const rand1 = Math.floor(Math.random() * randomDeck.length);
    const wrongCard1 = randomDeck.splice(rand1, 1);
    const wrongAnswer1 = wrongCard1[0].back.text;

    const rand2 = Math.floor(Math.random() * randomDeck.length);
    const wrongCard2 = randomDeck.splice(rand2, 1);
    const wrongAnswer2 = wrongCard2[0].back.text;

    const options = [...shuffle([correctAnswer, wrongAnswer1, wrongAnswer2])];

    setOptionAnswer1(options[0]);
    setOptionAnswer2(options[1]);
    setOptionAnswer3(options[2]);
  }, [cardIndex]);

  const handleCheckAnswer = (optionAnswer: string, button: 0 | 1 | 2) => {
    if (!animatingResponse) {
      setAnimatingResponse(true);

      const animate = ['dull-option', 'dull-option', 'dull-option'];

      if (optionAnswer === correctAnswer) {
        revealAnswer(true);
        animate[button] = 'correct-answer';
      } else {
        revealAnswer(false);
        [optionAnswer1, optionAnswer2, optionAnswer3].map((ans, i) => {
          if (ans === optionAnswer) animate[i] = 'wrong-answer';
          else if (ans === correctAnswer) animate[i] = 'correct-answer';
          else animate[i] = 'dull-option';
        });
      }
      setTimeout(() => setAnimationClasses([...animate] as [string, string, string]), 400);
      setTimeout(() => setAnimationClasses(defaultAnimationClasses), 1500);
      setTimeout(() => setAnimatingResponse(false), 1500);
    }
  };

  return (
    <>
      <Grid item xs={12} md={4}>
        <div className={cs.buttonWrapper}>
          <SquareButton
            fullWidth
            colour={ResponseColours[animationClasses[0]]}
            onClick={() => handleCheckAnswer(optionAnswer1, 0)}
            className={clsx(cs.button, cs[`${animationClasses[0]}`])}
          >
            <span>{optionAnswer1}</span>
          </SquareButton>
        </div>
      </Grid>
      <Grid item xs={12} md={4}>
        <div className={cs.buttonWrapper}>
          <SquareButton
            fullWidth
            colour={ResponseColours[animationClasses[1]]}
            onClick={() => handleCheckAnswer(optionAnswer2, 1)}
            className={clsx(cs.button, cs[`${animationClasses[1]}`])}
          >
            <span>{optionAnswer2}</span>
          </SquareButton>
        </div>
      </Grid>
      <Grid item xs={12} md={4}>
        <div className={cs.buttonWrapper}>
          <SquareButton
            fullWidth
            colour={ResponseColours[animationClasses[2]]}
            onClick={() => handleCheckAnswer(optionAnswer3, 2)}
            className={clsx(cs.button, cs[`${animationClasses[2]}`])}
          >
            <span>{optionAnswer3}</span>
          </SquareButton>
        </div>
      </Grid>
    </>
  );
};

type ChallengeDeckInputProps = {
  revealAnswer: (answer) => void;
  answerText: string;
};

export const ChallengeDeckInput: React.FC<ChallengeDeckInputProps> = ({
  revealAnswer,
  answerText,
}) => {
  const cs = useStyles();
  const [inputAnswer, setInputAnswer] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>();
  const [animatingResponse, setAnimatingResponse] = React.useState(false);
  const [animationClass, setAnimationClass] = React.useState('default');

  React.useEffect(() => {
    inputRef.current?.focus();
  }, [answerText]);

  const handleSubmitAnswer = () => {
    const leven = levenshtein as (s1: string, s2: string) => number;
    const lev = leven(
      answerText.replace(/[^A-Z0-9]/gi, '').toLowerCase(),
      inputAnswer.replace(/[^A-Z0-9]/gi, '').toLowerCase(),
    );
    const correct = lev < 3;

    if (correct) setInputAnswer(answerText);

    revealAnswer(correct);
    setTimeout(() => {
      setInputAnswer('');
    }, 1500);

    if (!animatingResponse) {
      setAnimatingResponse(true);

      const className = correct ? 'correct-answer' : 'wrong-answer';

      setTimeout(() => setAnimationClass(className), 400);
      setTimeout(() => {
        setAnimationClass('default');
        setAnimatingResponse(false);
      }, 1500);
    }
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmitAnswer();
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <div className={cs.container}>
          <div className={cs.wrapper}>
            <TextField
              inputProps={{ ref: inputRef }}
              focused
              fullWidth
              variant="outlined"
              value={inputAnswer}
              onKeyDown={handleEnterPress}
              onChange={(e) => setInputAnswer(e.target.value)}
              className={clsx(cs.answerTextField, cs[`${animationClass}`])}
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
              onClick={handleSubmitAnswer}
              className={cs.button}
            >
              Flip
            </SquareButton>
          </div>
        </div>
      </Grid>
    </>
  );
};
