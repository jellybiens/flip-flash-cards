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

export type DifficultyType = 'easy' | 'medium' | 'hard';

export type UserScore = {
  deckId: string;
  level: 'easy' | 'medium' | 'hard';
  score: number;
};

export type User = {
  _id: string;
  scores: UserScore[];
};

export type CardFaceFieldValues = {
  text: string;
  imgLink: string;
  imgFile: File;
  colour: CustomColours;
};

export type FlipCardFieldValues = {
  _id: string;
  front: CardFaceFieldValues;
  back: CardFaceFieldValues;
};

export type CardFaceProps = {
  text: string;
  imgLink?: string;
  colour?: CustomColours;
};

export type FlipCardProps = {
  _id: string;
  front: CardFaceProps;
  back: CardFaceProps;
};

export type DeckOverviewProps = {
  _id: string;
  title: string;
  subtitle?: string;
  imgLink?: string;
  colour?: CustomColours;
  cards: FlipCardProps[];
  subject?: string;
  language: string;
  score?: number;
  totalVotes?: number;
  votesToday?: number;
  createdAt?: Date;
  updatedAt?: Date;
};
