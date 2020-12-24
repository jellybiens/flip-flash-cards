import * as React from 'react';
import { FlipCardProps } from '@types';
import { FlipCardWrapper, FlipCardWrapperProps } from '../atoms/FlipCardWrapper';
import { CardFace } from '../atoms/CardFace';

export const FlipCard: React.FC<Omit<FlipCardProps, 'answer'> & FlipCardWrapperProps> = ({
  front,
  back,
  ...props
}) => {
  return (
    <FlipCardWrapper {...props}>
      <CardFace {...front} />
      <CardFace {...back} />
    </FlipCardWrapper>
  );
};
