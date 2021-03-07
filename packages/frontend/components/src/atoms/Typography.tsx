import * as React from 'react';
import {
  makeStyles,
  Theme,
  Typography as MuiTypography,
  TypographyProps,
  TypographyVariant,
} from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles((theme: Theme) => {
  const textFieldScaling = (variant: TypographyVariant) => ({
    [theme.breakpoints.only('xs')]: {
      ...theme.typography[variant],
      fontSize: `calc(${theme.typography[variant].fontSize} / 1.5)`,
    },
    [theme.breakpoints.only('sm')]: {
      ...theme.typography[variant],
      fontSize: `calc(${theme.typography[variant].fontSize} / 1)`,
    },
    [theme.breakpoints.only('md')]: {
      ...theme.typography[variant],
      fontSize: `calc(${theme.typography[variant].fontSize} / 0.95)`,
    },
    [theme.breakpoints.only('lg')]: {
      ...theme.typography[variant],
      fontSize: `calc(${theme.typography[variant].fontSize} / 0.85)`,
    },
    [theme.breakpoints.only('xl')]: {
      ...theme.typography[variant],
      fontSize: `calc(${theme.typography[variant].fontSize} / 0.7)`,
    },
  });

  return {
    default: { fontFamily: 'inherit' },
    secondary: { fontFamily: 'Roboto !important' },
    h1: { ...textFieldScaling('h1') },
    h2: { ...textFieldScaling('h2') },
    h3: { ...textFieldScaling('h3') },
    h4: { ...textFieldScaling('h4') },
    h5: { ...textFieldScaling('h5') },
    h6: { ...textFieldScaling('h6') },
    subtitle1: { ...textFieldScaling('subtitle1') },
    subtitle2: { ...textFieldScaling('subtitle2') },
    body1: { ...textFieldScaling('body1') },
    body2: { ...textFieldScaling('body2') },
    caption: { ...textFieldScaling('caption') },
    button: { ...textFieldScaling('button') },
    overline: { ...textFieldScaling('overline') },
  };
});

export const Typography: React.FC<
  TypographyProps & { font?: 'default' | 'secondary' }
> = ({ variant = 'body1', font = 'default', className, ...props }) => {
  const cs = useStyles();

  return <MuiTypography className={clsx(className, cs[variant], cs[font])} {...props} />;
};
