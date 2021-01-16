import * as Sequelize from 'sequelize';
import { uuidv4 } from '../helpers';

export const FlipCard = {
  _id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: uuidv4(),
  },
};
