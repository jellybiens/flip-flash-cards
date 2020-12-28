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
};

export type CardFaceProps = {
  text: string;
  imgLink?: string;
};

export type FlipCardProps = {
  cardId: string;
  front: CardFaceProps;
  back: CardFaceProps;
};
