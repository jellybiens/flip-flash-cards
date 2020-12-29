import * as React from 'react';
import clsx from 'clsx';
import { Button, ButtonProps } from '@material-ui/core';
import { CustomColours } from '../../themes';
import { IconNames, Icons } from '../../definitions';
import { useStyles } from './useButtonStyles';

export type SquareButtonProps = Omit<ButtonProps, 'startIcon' | 'endIcon' | 'color' | 'variant'> & {
  startIcon?: IconNames;
  endIcon?: IconNames;
  colour: CustomColours;
};

export const SquareButton: React.FC<SquareButtonProps> = ({
  startIcon,
  endIcon,
  colour,
  className,
  ...props
}) => {
  const cs = useStyles();

  const StartIcon = Icons[startIcon] || undefined;
  const EndIcon = Icons[endIcon] || undefined;

  const iconProps = {
    startIcon: startIcon && <StartIcon fontSize="inherit" color="inherit" />,
    endIcon: endIcon && <EndIcon fontSize="inherit" color="inherit" />,
  };

  return (
    <Button
      className={clsx(cs.root, className, {
        [cs[colour]]: !props.disabled,
        [cs.disabledButton]: props.disabled,
      })}
      {...iconProps}
      {...props}
    />
  );
};
