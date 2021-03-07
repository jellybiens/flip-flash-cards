import * as React from 'react';
import { FlipCardWrapper, FlipCardWrapperProps } from '../atoms/FlipCardWrapper';
import { CardFaceInput, CardFaceViewOption } from './CardFaceInput';

export type FrontBackViewOption = { front: CardFaceViewOption; back: CardFaceViewOption };

export type FlipCardInputProps = FlipCardWrapperProps & {
  index: number;
  rotate?: boolean;
  facesViewOption: FrontBackViewOption;
  setFacesViewOption: (views: FrontBackViewOption) => void;
};

export const FlipCardInput: React.FC<FlipCardInputProps> = ({
  index: i,
  rotate,
  facesViewOption,
  setFacesViewOption,
  ...props
}) => {
  const handleSetFacesViewOption = (view: CardFaceViewOption, face: 'front' | 'back') => {
    if (face === 'front') {
      setFacesViewOption({
        front: view,
        back: facesViewOption.back,
      });
    } else if (face === 'back') {
      setFacesViewOption({
        back: view,
        front: facesViewOption.front,
      });
    }
  };

  return (
    <FlipCardWrapper rotate={rotate} {...props}>
      <CardFaceInput
        front
        name={`deckCards.${i}.front`}
        cardIndex={i}
        cardFaceView={facesViewOption.front}
        setCardFaceView={(view) => handleSetFacesViewOption(view, 'front')}
      />
      <CardFaceInput
        back
        name={`deckCards.${i}.back`}
        cardIndex={i}
        cardFaceView={facesViewOption.back}
        setCardFaceView={(view) => handleSetFacesViewOption(view, 'back')}
      />
    </FlipCardWrapper>
  );
};
