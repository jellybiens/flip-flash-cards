import * as Sequelize from 'sequelize';
import { uuidv4 } from '../helpers';

export type FlipCardAttributes = Sequelize.Model & {
  _id: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type FlipCardModel = typeof Sequelize.Model & (new () => FlipCardAttributes);

export const FlipCard = {
  _id: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: () => uuidv4(),
  },
};
