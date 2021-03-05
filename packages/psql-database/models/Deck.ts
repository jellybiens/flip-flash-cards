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
  subtitle: {
    type: Sequelize.STRING,
    defaultValue: '',
  },
  imgLink: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  colour: {
    type: Sequelize.STRING,
    defaultValue: 'white',
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
  approved: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  reviewed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: new Date(),
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
};
