export type CardSize = 'sm' | 'md' | 'lg';

export enum CardPixels {
  xs = 200,
  sm = 300,
  md = 400,
  lg = 500,
  xl = 600,
}

// TODO: Validation - possible logic for validation, types may not need it
// type ForceCardFaceTextValue = {
//   text: string;
//   imgLink?: string;
//   imgFile?: File;
// };
// type ForceCardFaceImageValue = {
//   text?: string;
//   imgLink: string;
//   imgFile?: File;
// };

// export type CardFrontFieldValues = ForceCardFaceTextValue | ForceCardFaceImageValue;

export type CardFaceFieldValues = {
  text: string;
  imgLink: string;
  imgFile: File;
};

export type FlipCardFieldValues = {
  cardId: string;
  front: CardFaceFieldValues;
  back: CardFaceFieldValues;
  answer: string;
};

export type CardFaceTextProps = {
  text: string;
  imgLink?: string;
};
export type CardFaceImageProps = {
  text?: string;
  imgLink: string;
};

export type CardFaceProps = CardFaceTextProps | CardFaceImageProps;

export type FlipCardProps = {
  front: CardFaceProps;
  back: CardFaceProps;
  answer: string;
};
