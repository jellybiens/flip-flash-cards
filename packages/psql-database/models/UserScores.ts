import * as Sequelize from 'sequelize';
import { uuidv4 } from '../helpers';

export type UserScoresAttributes = Sequelize.Model & {
  _id?: string;
  level: 'easy' | 'medium' | 'hard';
  score: number;
  userId: string;
  deckId: string;
};

export type UserScoresModel = typeof Sequelize.Model & (new () => UserScoresAttributes);

export const UserScores = {
  _id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: () => uuidv4(),
  },
  level: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
};
