import * as React from 'react';
import { Slider as MuiSlider, SliderProps as MuiSliderProps } from '@material-ui/core';
import { usePreventScroll } from '../helpers';

type SliderProps = Omit<MuiSliderProps, 'value' | 'onChange' | 'onWheel'> & {
  value: number;
  setValue: (v: number) => void;
  onChange: (e: React.ChangeEvent, v: number) => void;
};

export const Slider: React.FC<SliderProps> = ({
  value,
  setValue,
  step,
  min,
  max,
  onChange,
  ...props
}) => {
  const { disableScroll, enableScroll } = usePreventScroll();

  const handleWheelEvent = (e: React.WheelEvent<HTMLSpanElement>) => {
    const dir = Math.sign(e.deltaY);
    if (dir === -1 && value < max) setValue(value + step);
    if (dir === 1 && value > min) setValue(value - step);
  };

  return (
    <MuiSlider
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
