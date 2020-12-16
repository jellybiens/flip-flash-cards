import * as React from 'react';
import { IconButton, IconButtonProps, makeStyles, Theme } from '@material-ui/core';
import { CustomColours } from '../themes';
import { IconNames, Icons } from '../definitions';

const useStyles = makeStyles((theme: Theme) => {
  const colours = Object.keys(CustomColours).map((k: unknown) => k as CustomColours);
  let colourObjects = {};
  colours.map((c) => {
    colourObjects = Object.assign(colourObjects, {
      [c]: {
        backgroundColor: theme.palette[c].main,
        color: theme.palette[c].contrastText,
        '&:hover': { backgroundColor: theme.palette[c].light },
      },
    });
  });

  return {
    root: {
      margin: 'auto',
      display: 'flex',
      padding: theme.spacing(1),
    },
    ...colourObjects,
  };
});

export type CircleButtonProps = Omit<IconButtonProps, 'color' | 'aria-label'> & {
  iconName: IconNames;
  colour: CustomColours;
};

export const CircleButton: React.FC<CircleButtonProps> = ({ iconName, colour, ...props }) => {
  const cs = useStyles();

  const IconComponent = Icons[iconName];

  return (
    <IconButton className={cs[colour]} aria-label={iconName} {...props}>
      <IconComponent fontSize="inherit" color="inherit" />
    </IconButton>
  );
};
