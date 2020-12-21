export type CardSize = 'sm' | 'md' | 'lg';

export enum CardPixels {
  xs = 250,
  sm = 350,
  md = 450,
  lg = 600,
  xl = 750,
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
  front: CardFaceFieldValues;
  back: CardFaceFieldValues;
  answer: string;
};
