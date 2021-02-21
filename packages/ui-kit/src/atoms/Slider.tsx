import * as React from 'react';
import {
  makeStyles,
  Slider as MuiSlider,
  SliderProps as MuiSliderProps,
  Theme,
} from '@material-ui/core';
import { usePreventScroll } from '../helpers';

type SliderProps = Omit<MuiSliderProps, 'value' | 'onChange' | 'onWheel'> & {
  value: number;
  setValue: (v: number) => void;
  onChange: (e: React.ChangeEvent, v: number) => void;
};

const useStyles = makeStyles((theme: Theme) => ({
  railTrack: {
    [theme.breakpoints.only('xs')]: {
      height: 2,
      borderRadius: 2,
    },
    [theme.breakpoints.only('sm')]: {
      height: 6,
      borderRadius: 6,
    },
    [theme.breakpoints.only('md')]: {
      height: 10,
      borderRadius: 10,
    },
    [theme.breakpoints.only('lg')]: {
      height: 14,
      borderRadius: 14,
    },
    [theme.breakpoints.only('xl')]: {
      height: 18,
      borderRadius: 18,
    },
  },
  thumb: {
    [theme.breakpoints.only('xs')]: {
      height: 12,
      width: 12,
    },
    [theme.breakpoints.only('sm')]: {
      height: 16,
      width: 16,
    },
    [theme.breakpoints.only('md')]: {
      height: 20,
      width: 20,
    },
    [theme.breakpoints.only('lg')]: {
      height: 24,
      width: 24,
    },
    [theme.breakpoints.only('xl')]: {
      height: 28,
      width: 28,
    },
  },
}));

export const Slider: React.FC<SliderProps> = ({
  value,
  setValue,
  step,
  min,
  max,
  onChange,
  ...props
}) => {
  const cs = useStyles();
  const { disableScroll, enableScroll } = usePreventScroll();

  const handleWheelEvent = (e: React.WheelEvent<HTMLSpanElement>) => {
    const dir = Math.sign(e.deltaY);
    if (dir === -1 && value < max) setValue(value + step);
    if (dir === 1 && value > min) setValue(value - step);
  };

  return (
    <MuiSlider
      classes={{ rail: cs.railTrack, track: cs.railTrack, thumb: cs.thumb }}
      value={value}
      step={step}
      min={min}
      max={max}
      onChange={onChange}
      onWheel={handleWheelEvent}
      {...props}
      onMouseEnter={disableScroll}
      onMouseLeave={enableScroll}
    />
  );
};
