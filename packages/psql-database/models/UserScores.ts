import * as Sequelize from 'sequelize';

export type UserScoresAttributes = Sequelize.Model & {
  level: 'easy' | 'medium' | 'hard';
  score: number;
  userId: string;
  deckId: string;
};

export type UserScoresModel = typeof Sequelize.Model & (new () => UserScoresAttributes);

export const UserScores = {
  level: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
};
