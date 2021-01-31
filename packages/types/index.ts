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

export type Languages = 'en' | 'fr' | 'de' | 'es' | 'pt' | 'ru' | 'ja';

export enum CountryLanguages {
  'AT' = 'de',
  'DE' = 'de',
  'LI' = 'de',
  'CH' = 'de',
  'AG' = 'en',
  'AI' = 'en',
  'AU' = 'en',
  'BB' = 'en',
  'BM' = 'en',
  'BS' = 'en',
  'BZ' = 'en',
  'CC' = 'en',
  'CX' = 'en',
  'DM' = 'en',
  'FJ' = 'en',
  'FK' = 'en',
  'FM' = 'en',
  'GD' = 'en',
  'GG' = 'en',
  'GH' = 'en',
  'GI' = 'en',
  'GM' = 'en',
  'GS' = 'en',
  'GY' = 'en',
  'HM' = 'en',
  'IM' = 'en',
  'IO' = 'en',
  'JE' = 'en',
  'JM' = 'en',
  'KI' = 'en',
  'KN' = 'en',
  'KY' = 'en',
  'LC' = 'en',
  'LR' = 'en',
  'MS' = 'en',
  'NG' = 'en',
  'SB' = 'en',
  'SH' = 'en',
  'SL' = 'en',
  'SS' = 'en',
  'TC' = 'en',
  'TO' = 'en',
  'TT' = 'en',
  'TV' = 'en',
  'UM' = 'en',
  'US' = 'en',
  'VC' = 'en',
  'VG' = 'en',
  'VI' = 'en',
  'ZM' = 'en',
  'ZA' = 'en',
  'GU' = 'en',
  'MP' = 'en',
  'AQ' = 'en',
  'CA' = 'en',
  'IE' = 'en',
  'GB' = 'en',
  'MH' = 'en',
  'MW' = 'en',
  'PW' = 'en',
  'NF' = 'en',
  'PN' = 'en',
  'CK' = 'en',
  'NA' = 'en',
  'AS' = 'en',
  'ZW' = 'en',
  'SZ' = 'en',
  'LS' = 'en',
  'UG' = 'en',
  'PH' = 'en',
  'BW' = 'en',
  'PG' = 'en',
  'PK' = 'en',
  'AR' = 'es',
  'CL' = 'es',
  'CO' = 'es',
  'CR' = 'es',
  'CU' = 'es',
  'DO' = 'es',
  'EC' = 'es',
  'GT' = 'es',
  'HN' = 'es',
  'MX' = 'es',
  'NI' = 'es',
  'PA' = 'es',
  'PE' = 'es',
  'SV' = 'es',
  'UY' = 'es',
  'VE' = 'es',
  'PR' = 'es',
  'GQ' = 'es',
  'PY' = 'es',
  'BO' = 'es',
  'BF' = 'fr',
  'BI' = 'fr',
  'BJ' = 'fr',
  'BL' = 'fr',
  'CD' = 'fr',
  'CG' = 'fr',
  'CI' = 'fr',
  'FR' = 'fr',
  'GA' = 'fr',
  'GF' = 'fr',
  'GN' = 'fr',
  'GP' = 'fr',
  'MC' = 'fr',
  'MF' = 'fr',
  'ML' = 'fr',
  'MQ' = 'fr',
  'NC' = 'fr',
  'NE' = 'fr',
  'PF' = 'fr',
  'PM' = 'fr',
  'RE' = 'fr',
  'SN' = 'fr',
  'TF' = 'fr',
  'TG' = 'fr',
  'WF' = 'fr',
  'YT' = 'fr',
  'TD' = 'fr',
  'DJ' = 'fr',
  'CM' = 'fr',
  'SC' = 'fr',
  'HT' = 'fr',
  'CF' = 'fr',
  'MA' = 'fr',
  'JP' = 'ja',
  'AO' = 'pt',
  'BR' = 'pt',
  'CV' = 'pt',
  'GW' = 'pt',
  'MZ' = 'pt',
  'PT' = 'pt',
  'ST' = 'pt',
  'TL' = 'pt',
  'RU' = 'ru',
}
