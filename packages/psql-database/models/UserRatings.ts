import * as Sequelize from 'sequelize';

export type UserRatingsAttributes = Sequelize.Model & {
  userId: string;
  deckId: string;
  rating: number;
};

export type UserRatingsModel = typeof Sequelize.Model & (new () => UserRatingsAttributes);

export const UserRatings = {
  rating: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
};
