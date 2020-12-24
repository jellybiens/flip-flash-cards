import * as React from 'react';
import { FlipCardFieldValues } from '@types';
import { useField } from 'formik';
import { FlipCardWrapper, FlipCardWrapperProps } from '../atoms/FlipCardWrapper';
import { CardFaceInput } from './CardFaceInput';
import { CircleButton } from '../atoms/Buttons';

export type FlipCardInputProps = FlipCardWrapperProps & {
  index: number;
  rotate?: boolean;
};

let typeingTimeout = null;

export const FlipCardInput: React.FC<FlipCardInputProps> = ({ index: i, rotate, ...props }) => {
  const backsideRef = React.useRef<HTMLInputElement>();
  const [, , helpers] = useField<FlipCardFieldValues['answer']>(`deckCards.${i}.answer`);

  // TODO:  I think this functionality slows down the form a lot
  //        Must investigate this and convert to fastfield if so
  React.useEffect(() => {
    clearTimeout(typeingTimeout);
    // Make a new timeout set to go off after finish typing
    typeingTimeout = setTimeout(() => {
      helpers.setValue(backsideRef.current.value);
    }, 600);
  }, [backsideRef.current?.value]);

  return (
    <>
      <FlipCardWrapper rotate={rotate} {...props}>
        <CardFaceInput name={`deckCards.${i}.front`} cardIndex={i} />
        <CardFaceInput name={`deckCards.${i}.back`} cardIndex={i} backsideRef={backsideRef} />
      </FlipCardWrapper>
    </>
  );
};
