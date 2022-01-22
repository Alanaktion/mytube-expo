import React, { useRef } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { gql, useQuery } from "@apollo/react-hooks";
import { useScrollToTop } from '@react-navigation/native';

import { Icon, Text } from "./Themed";
import { Channel } from "../types";
import { ClientContext } from "../api/Client";

const CHANNELS_QUERY = gql`
  query Channels($page: Int!, $search: String) {
    channels(page: $page, search: $search) {
      data {
        id
        uuid
        type
        title
        image_url
      }
      current_page
      last_page
      total
    }
  }
`;

type Props = {
  onItemPress: Function;
  search?: String;
};

export function ChannelList({ onItemPress, search }: Props) {
  const { data, loading, error, fetchMore } = useQuery(CHANNELS_QUERY, {
    variables: {
      page: 1,
      search,
    },
  });
  const ref = useRef(null);
  useScrollToTop(ref);
  const { baseUri } = React.useContext(ClientContext);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    console.warn(error);
    return (
      <View style={styles.centerContainer}>
        <Icon size={60} name="warning-outline" />
        <Text>Failed to load channels.</Text>
      </View>
    );
  }

  if (!data.channels.total) {
    return (
      <View style={styles.centerContainer}>
        <Text>No channels found.</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Channel }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        onItemPress(item);
      }}
      activeOpacity={0.6}
    >
      {item.image_url ?
        <Image style={styles.avatar} source={{ uri: `${baseUri}${item.image_url}` }} /> :
        <View style={[styles.avatar, {backgroundColor: 'rgba(127, 127, 127, 0.2)'}]} />
      }
      <View style={{ flexShrink: 1 }}>
        <Text>{item.title}</Text>
        <Text style={{ opacity: 0.5, marginTop: 5 }}>{item.type}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList data={data.channels.data}
      renderItem={renderItem}
      keyExtractor={item => `${item.id}`}
      onEndReached={() => {
        if (data.channels.current_page < data.channels.last_page && typeof fetchMore === 'function') {
          fetchMore({
            variables: {
              page: data.channels.current_page + 1,
            },
          });
        }
      }}
      onEndReachedThreshold={0.15}
      ref={ref}
    />
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(127, 127, 127, 0.2)',
    borderRadius: 30,
  },
});
