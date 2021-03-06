import * as Sequelize from 'sequelize';
import { uuidv4 } from '../helpers';

export type TagAttributes = Sequelize.Model & {
  _id?: string;
  text: string;
  deckId: string;
};

export type TagModel = typeof Sequelize.Model & (new () => TagAttributes);

export const Tag = {
  _id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: () => uuidv4(),
  },
  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};
