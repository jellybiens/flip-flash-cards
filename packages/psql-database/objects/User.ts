import * as Sequelize from 'sequelize';
import { uuidv4 } from '../helpers';

export const User = {
  _id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: () => uuidv4(),
  },
  played: {
    type: Sequelize.STRING,
    allowNull: true,
  },
};
