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
