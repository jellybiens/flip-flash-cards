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

export type User = {
  _id: string;
  decks: string[];
  played: {
    easy: { [deckId: string]: number };
    medium: { [deckId: string]: number };
    hard: { [deckId: string]: number };
  };
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
  imgLink: string;
  colour: CustomColours;
  cards: FlipCardProps[];
  subject: string;
  score: number;
  totalVotes: number;
  createdAt: Date;
  updatedAt: Date;
};
