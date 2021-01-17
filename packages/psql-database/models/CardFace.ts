import { CardFaceProps } from '@types';
import * as Sequelize from 'sequelize';
import { uuidv4 } from '../helpers';

export type CardFaceAttributes = Sequelize.Model & CardFaceProps;

export type CardFaceModel = typeof Sequelize.Model & (new () => CardFaceAttributes);

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
    defaultValue: 'white',
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
    defaultValue: 'white',
  },
};
