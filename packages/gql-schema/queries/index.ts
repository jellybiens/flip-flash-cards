import { GraphQLObjectType, GraphQLObjectTypeConfig } from 'graphql/type';
import { getAllCardsQuery } from './getAllCards';
import { getDeckCardsQuery } from './getDeckCards';
import { getDecksNewestQuery } from './getDecks_Newest';
import { getDecksTopRatedQuery } from './getDecks_TopRated';
import { getDecksTrendingQuery } from './getDecks_Trending';
import { getUserDecksQuery } from './getDecks_User';
import { getTagsQuery } from './getTags';
import { getUserQuery } from './getUser';

const QueryDef: GraphQLObjectTypeConfig<unknown, unknown> = {
  name: 'RootQuery',
  description: 'Root for all queries',
  fields: () => ({
    ...getAllCardsQuery.fields,
    ...getDeckCardsQuery.fields,
    ...getDecksNewestQuery.fields,
    ...getDecksTopRatedQuery.fields,
    ...getDecksTrendingQuery.fields,
    ...getUserDecksQuery.fields,
    ...getUserQuery.fields,
    ...getTagsQuery.fields,
  }),
};

export const Query = new GraphQLObjectType(QueryDef);
