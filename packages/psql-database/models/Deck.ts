import * as Sequelize from 'sequelize';
import { uuidv4 } from '../helpers';

export const Deck = {
  _id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: () => uuidv4(),
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imgLink: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  colour: {
    type: Sequelize.STRING,
  },
  subject: {
    type: Sequelize.STRING,
  },
  score: {
    type: Sequelize.FLOAT,
  },
  totalVotes: {
    type: Sequelize.INTEGER,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
};
