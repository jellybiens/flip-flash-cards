import Conn from '@database';
// import { UserAttributes } from '@database/models';
import { GraphQLObjectTypeConfig, GraphQLID, GraphQLList } from 'graphql/type';

import { GqlCardDeckModel } from '../models';

export const getUserDecksQuery: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'getUserDecksQuery',
  description: 'Fetch the decks of a specific user by _id',
  fields: {
    getDeckCards: {
      type: new GraphQLList(GqlCardDeckModel),
      args: {
        userId: {
          type: GraphQLID,
        },
      },
      resolve: (_, args) => {
        return Conn.models.users.findOne({
          where: { userId: args.userId },
        });
        // TODO:
        // .then((user: UserAttributes) => {
        //   const userDate = {
        //     played: JSON.parse(user.played),
        //     ...user,
        //   };
        //   return userDate;
        // });
      },
    },
  },
};
