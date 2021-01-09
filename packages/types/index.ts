export type CardSize = 'sm' | 'md' | 'lg';

export enum CardPixels {
  xs = 200,
  sm = 300,
  md = 400,
  lg = 500,
  xl = 600,
}

export type CustomColours =
  | 'white'
  | 'black'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'lime'
  | 'turquoise'
  | 'cyan'
  | 'blue'
  | 'purple'
  | 'violet'
  | 'gold'
  | 'silver'
  | 'bronze'
  | 'dull';

export type CardFaceFieldValues = {
  text: string;
  imgLink: string;
  imgFile: File;
  colour: CustomColours;
};

export type FlipCardFieldValues = {
  cardId: string;
  front: CardFaceFieldValues;
  back: CardFaceFieldValues;
};

export type CardFaceProps = {
  text: string;
  imgLink?: string;
  colour?: CustomColours;
};

export type FlipCardProps = {
  cardId: string;
  front: CardFaceProps;
  back: CardFaceProps;
};

export type DeckOverviewProps = {
  deckId: string;
  title: string;
  imgLink: string;
  colour: CustomColours;
  cards: FlipCardProps[];
  subject: string;
  score: number;
  votes: number;
};
