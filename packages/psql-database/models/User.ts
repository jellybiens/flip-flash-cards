import * as Sequelize from 'sequelize';
import { uuidv4 } from '../helpers';
import { UserScoresAttributes } from './UserScores';

export type UserAttributes = Sequelize.Model & {
  _id?: string;
  scores: UserScoresAttributes[];
};

export type UserModel = typeof Sequelize.Model & (new () => UserAttributes);

export const User = {
  _id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: () => uuidv4(),
  },
  locked: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
};
