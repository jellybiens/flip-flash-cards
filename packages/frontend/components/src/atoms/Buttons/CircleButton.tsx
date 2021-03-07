import * as React from 'react';
import clsx from 'clsx';
import { CustomColours } from '@types';
import { IconButton, IconButtonProps } from '@material-ui/core';
import { IconNames, Icons } from '../../definitions';
import { useStyles } from './useButtonStyles';

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
    <IconButton
      className={clsx(cs.root, className, {
        [cs[colour]]: !props.disabled,
        [cs.disabledButton]: props.disabled,
      })}
      aria-label={iconName}
      {...props}
    >
      <IconComponent fontSize="inherit" color="inherit" />
    </IconButton>
  );
};
