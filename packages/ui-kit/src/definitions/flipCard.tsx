import { Theme } from '@material-ui/core/styles';
import { CreateCSSProperties } from '@material-ui/core/styles/withStyles';
import { CardPixels } from '@types';

export const FlipCardSizing = (theme: Theme): CreateCSSProperties => ({
  [theme.breakpoints.only('xs')]: {
    height: CardPixels.xs,
    width: CardPixels.xs,
  },
  [theme.breakpoints.only('sm')]: {
    height: CardPixels.sm,
    width: CardPixels.sm,
  },
  [theme.breakpoints.only('md')]: {
    height: CardPixels.md,
    width: CardPixels.md,
  },
  [theme.breakpoints.only('lg')]: {
    height: CardPixels.lg,
    width: CardPixels.lg,
  },
  [theme.breakpoints.only('xl')]: {
    height: CardPixels.xl,
    width: CardPixels.xl,
  },
});

type FlipCardFaceStyleProps = {
  cardFace: CreateCSSProperties;
  bottomContainer: CreateCSSProperties;
  bottomWrapper: CreateCSSProperties;
  imageArea: CreateCSSProperties;
  imageInputContainer: CreateCSSProperties;
  imageContainer: CreateCSSProperties;
  faceImage: CreateCSSProperties;
  fullFace: CreateCSSProperties;
};

export const FlipCardFaceStyles: FlipCardFaceStyleProps = {
  cardFace: {
    height: '100%',
    width: '100%',
    padding: '1%',
    textAlign: 'center',
  },
  bottomContainer: { height: '20%', width: '100%', display: 'flex' },
  bottomWrapper: { margin: 'auto', height: 'auto', width: 'auto' },
  imageArea: {
    height: '80%',
    width: '100%',
    padding: '5% 5% 0 5%',
    borderColor: 'inherit',
  },
  imageInputContainer: {
    position: 'relative',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
    height: 'calc(100% - 4px)',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 10,
    borderStyle: 'solid',
    borderColor: 'inherit',
    backgroundColor: '#eee',
  },
  faceImage: { objectFit: 'cover', height: '100%', width: '100%' },
  fullFace: { height: '100%', width: '100%', padding: '5%', display: 'flex' },
};

type FlipCardFaceColourProps = {
  whiteCard: CreateCSSProperties;
  blackCard: CreateCSSProperties;
  redCard: CreateCSSProperties;
  orangeCard: CreateCSSProperties;
  yellowCard: CreateCSSProperties;
  greenCard: CreateCSSProperties;
  limeCard: CreateCSSProperties;
  turquoiseCard: CreateCSSProperties;
  cyanCard: CreateCSSProperties;
  blueCard: CreateCSSProperties;
  purpleCard: CreateCSSProperties;
  violetCard: CreateCSSProperties;
};

export const FlipCardColours = (theme: Theme): FlipCardFaceColourProps => ({
  whiteCard: {
    backgroundColor: theme.palette.white.main,
    color: theme.palette.white.contrastText,
    borderStyle: 'none',
    borderColor: theme.palette.white.dark,
  },
  blackCard: {
    backgroundColor: theme.palette.black.main,
    color: theme.palette.black.contrastText,
    borderStyle: 'none',
    borderColor: theme.palette.black.dark,
  },
  redCard: {
    backgroundColor: theme.palette.red.main,
    color: theme.palette.red.contrastText,
    borderStyle: 'none',
    borderColor: theme.palette.red.dark,
  },
  orangeCard: {
    backgroundColor: theme.palette.orange.main,
    color: theme.palette.orange.contrastText,
  },
  yellowCard: {
    backgroundColor: theme.palette.yellow.main,
    color: theme.palette.yellow.contrastText,
    borderStyle: 'none',
    borderColor: theme.palette.orange.dark,
  },
  greenCard: {
    backgroundColor: theme.palette.green.main,
    color: theme.palette.green.contrastText,
    borderStyle: 'none',
    borderColor: theme.palette.green.dark,
  },
  limeCard: {
    backgroundColor: theme.palette.lime.main,
    color: theme.palette.lime.contrastText,
    borderStyle: 'none',
    borderColor: theme.palette.lime.dark,
  },
  turquoiseCard: {
    backgroundColor: theme.palette.turquoise.main,
    color: theme.palette.turquoise.contrastText,
    borderStyle: 'none',
    borderColor: theme.palette.turquoise.dark,
  },
  cyanCard: {
    backgroundColor: theme.palette.cyan.main,
    color: theme.palette.cyan.contrastText,
    borderStyle: 'none',
    borderColor: theme.palette.cyan.dark,
  },
  blueCard: {
    backgroundColor: theme.palette.blue.main,
    color: theme.palette.blue.contrastText,
    borderStyle: 'none',
    borderColor: theme.palette.blue.dark,
  },
  purpleCard: {
    backgroundColor: theme.palette.purple.main,
    color: theme.palette.purple.contrastText,
    borderStyle: 'none',
    borderColor: theme.palette.purple.dark,
  },
  violetCard: {
    backgroundColor: theme.palette.violet.main,
    color: theme.palette.violet.contrastText,
    borderStyle: 'none',
    borderColor: theme.palette.violet.dark,
  },
});
