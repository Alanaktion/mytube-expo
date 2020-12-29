import { ApolloClient, InMemoryCache } from "@apollo/client";

export const baseUri = "http://localhost:8000";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        videos: {
          keyArgs: ['id', 'uuid', 'channel_id', 'search'],
          merge(existing: any = {data: []}, incoming: any) {
            return {
              current_page: incoming.current_page,
              last_page: incoming.last_page,
              total: incoming.total,
              data: existing.data.concat(incoming.data),
            };
          },
        },
        channels: {
          keyArgs: ['id', 'uuid', 'search'],
          merge(existing: any = {data: []}, incoming: any) {
            return {
              current_page: incoming.current_page,
              last_page: incoming.last_page,
              total: incoming.total,
              data: existing.data.concat(incoming.data),
            };
          },
        },
      },
    },
  },
});

export const Client = new ApolloClient({
  uri: `${baseUri}/graphql`,
  headers: {
    // authorization: `Bearer ${accessToken}`,
  },
  cache,
});
