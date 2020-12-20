import * as React from 'react';
import { Tooltip, useMediaQuery, useTheme } from '@material-ui/core';
import { SquareButton, SquareButtonProps } from './SquareButton';
import { CircleButton, CircleButtonProps } from './CircleButton';
import { IconNames } from '../../definitions';

type ButtonProps1 = Omit<SquareButtonProps, 'startIcon' | 'endIcon'> &
  Omit<CircleButtonProps, 'iconName'> & {
    iconName: IconNames;
    startIcon?: IconNames;
    endIcon?: IconNames;
  };

type ButtonProps2 = Omit<SquareButtonProps, 'startIcon' | 'endIcon'> &
  Omit<CircleButtonProps, 'iconName'> & {
    iconName?: IconNames;
    startIcon: IconNames;
    endIcon?: IconNames;
  };

type ButtonProps3 = Omit<SquareButtonProps, 'startIcon' | 'endIcon'> &
  Omit<CircleButtonProps, 'iconName'> & {
    iconName?: IconNames;
    startIcon?: IconNames;
    endIcon: IconNames;
  };

type ButtonProps = ButtonProps1 | ButtonProps2 | ButtonProps3;

export const ResponsiveButton: React.FC<ButtonProps> = ({
  iconName,
  startIcon,
  endIcon,
  ...props
}) => {
  const theme = useTheme();
  const small = useMediaQuery(theme.breakpoints.down('xs'));

  if (!small) {
    if (iconName) return <CircleButton iconName={iconName} {...props} />;
    else return <SquareButton {...{ startIcon, endIcon }} {...props} />;
  }

  return (
    <Tooltip title={props.children} open={props.children} placement="top" arrow>
      <div>
        <CircleButton iconName={iconName || startIcon || endIcon} {...props} />
      </div>
    </Tooltip>
  );
};
