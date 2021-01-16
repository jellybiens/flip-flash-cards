import * as React from 'react';
import { FlipCardWrapper, FlipCardWrapperProps } from '../atoms/FlipCardWrapper';
import { CardFaceInput } from './CardFaceInput';

export type FlipCardInputProps = FlipCardWrapperProps & {
  index: number;
  rotate?: boolean;
};

export const FlipCardInput: React.FC<FlipCardInputProps> = ({
  index: i,
  rotate,
  ...props
}) => (
  <FlipCardWrapper rotate={rotate} {...props}>
    <CardFaceInput front name={`deckCards.${i}.front`} cardIndex={i} />
    <CardFaceInput back name={`deckCards.${i}.back`} cardIndex={i} />
  </FlipCardWrapper>
);
