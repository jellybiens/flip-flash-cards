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
    allowNull: true,
  },
  subject: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  score: {
    type: Sequelize.NUMBER,
    allowNull: true,
  },
  totalVotes: {
    type: Sequelize.STRING,
    allowNull: true,
  },
};
