import { DeckOverviewProps } from '@types';
import * as Sequelize from 'sequelize';
import { uuidv4 } from '../helpers';

export type DeckAttributes = Sequelize.Model & DeckOverviewProps;

export type DeckModel = typeof Sequelize.Model & (new () => DeckAttributes);

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
    defaultValue: 'white',
  },
  subject: {
    type: Sequelize.STRING,
    defaultValue: 'Trivia',
  },
  language: {
    type: Sequelize.STRING,
    defaultValue: 'en',
  },
  score: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
  totalVotes: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  votesToday: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
};