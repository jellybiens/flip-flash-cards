import * as Sequelize from 'sequelize';
import { uuidv4 } from '../helpers';

export const CardFace = {
  _id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: () => uuidv4(),
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imgLink: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  colour: {
    type: Sequelize.STRING,
    allowNull: true,
  },
};
