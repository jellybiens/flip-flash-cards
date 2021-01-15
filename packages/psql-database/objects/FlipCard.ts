import * as Sequelize from 'sequelize';
import { uuidv4 } from '../helpers';

export const FlipCard = {
  cardId: {
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: uuidv4(),
  },
  frontId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  backId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
  deckId: {
    type: Sequelize.UUID,
    allowNull: false,
  },
};
