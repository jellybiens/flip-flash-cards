import * as React from 'react';
import clsx from 'clsx';
import { IconButton, IconButtonProps } from '@material-ui/core';
import { IconNames, Icons } from '../../definitions';
import { useStyles } from './useButtonStyles';
import { CustomColours } from '../../themes';

export type CircleButtonProps = Omit<IconButtonProps, 'color' | 'aria-label'> & {
  iconName: IconNames;
  colour: CustomColours;
};

export const CircleButton: React.FC<CircleButtonProps> = ({
  iconName,
  colour,
  className,
  ...props
}) => {
  const cs = useStyles();

  const IconComponent = Icons[iconName];

  return (
    <IconButton className={clsx(cs.root, cs[colour], className)} aria-label={iconName} {...props}>
      <IconComponent fontSize="inherit" color="inherit" />
    </IconButton>
  );
};
