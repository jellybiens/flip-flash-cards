import * as Sequelize from 'sequelize';
import { uuidv4 } from '../helpers';

export type UserAttributes = Sequelize.Model & {
  _id?: string;
  played: string;
};

export type UserModel = typeof Sequelize.Model & (new () => UserAttributes);

export const User = {
  _id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: () => uuidv4(),
  },
  played: {
    type: Sequelize.STRING,
    defaultValue: '',
    allowNull: true,
  },
  locked: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
};
