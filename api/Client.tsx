import * as React from 'react';
import { ApolloClient, NormalizedCacheObject, InMemoryCache } from "@apollo/client";

export const Cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        videos: {
          keyArgs: ['id', 'uuid', 'channel_id', 'search'],
          merge(existing: any = {data: []}, incoming: any = {}) {
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
          merge(existing: any = {data: []}, incoming: any = {}) {
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

type ContextType = {
  setUri: (value: string) => void;
  clearUri: () => void;
  client: ApolloClient<NormalizedCacheObject>|null;
  baseUri: string|null;
};

export const ClientContext = React.createContext<ContextType>({
  setUri: (value: string) => console.warn('No setUri handler set'),
  clearUri: () => {},
  client: null,
  baseUri: null,
});
