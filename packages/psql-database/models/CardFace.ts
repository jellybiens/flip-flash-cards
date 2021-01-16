import * as Sequelize from 'sequelize';
import { uuidv4 } from '../helpers';

export const FrontFace = {
  _id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: () => uuidv4(),
  },
  text: {
    type: Sequelize.STRING,
  },
  imgLink: {
    type: Sequelize.STRING,
  },
  colour: {
    type: Sequelize.STRING,
  },
};
export const BackFace = {
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
  },
  colour: {
    type: Sequelize.STRING,
  },
};
