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

export type CardFrontFieldValues = {
  text: string;
  imgLink: string;
  imgFile: File;
};

export type CardBackFieldValues = CardFrontFieldValues & {
  answer: string;
};

export type FlipCardFieldValues = {
  front: CardFrontFieldValues;
  back: CardBackFieldValues;
};
