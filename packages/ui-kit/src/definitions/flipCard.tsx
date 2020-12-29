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
  imageArea: { height: '80%', width: '100%', padding: '5% 5% 0 5%' },
  imageContainer: {
    position: 'relative',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
    borderRadius: 10,
    borderStyle: 'groove inset',
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  faceImage: { objectFit: 'cover', height: '100%', width: '100%' },
  fullFace: { height: '100%', width: '100%', padding: '5%' },
};
