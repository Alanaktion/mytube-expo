import React, { useRef } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { gql, useQuery } from "@apollo/react-hooks";
import { useScrollToTop } from '@react-navigation/native';

import { Icon, Text } from "./Themed";
import { baseUri } from "../api/Client";
import { Video } from "../types";
import Colors from "../constants/Colors";

const VIDEOS_QUERY = gql`
  query Videos($page: Int!, $channelId: Int, $search: String) {
    videos(page: $page, channel_id: $channelId, search: $search) {
      data {
        id
        uuid
        title
        thumbnail_url
        published_at
        channel {
          uuid
          title
        }
      }
      current_page
      last_page
      total
    }
  }
`;

type Props = {
  onItemPress: Function;
  channelId?: Number;
  search?: String;
};

export function VideoList({ onItemPress, channelId, search }: Props) {
  const { data, loading, error, fetchMore } = useQuery(VIDEOS_QUERY, {
    variables: {
      page: 1,
      channelId,
      search,
    },
  });
  const ref = useRef(null);
  useScrollToTop(ref);

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
        <Text>Failed to load videos.</Text>
      </View>
    );
  }

  if (!data.videos.total) {
    <View style={styles.centerContainer}>
      <Text>No videos found.</Text>
    </View>
  }

  const renderItem = ({ item }: { item: Video }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        onItemPress(item);
      }}
      activeOpacity={0.6}
    >
      <Image style={styles.thumbnail} source={{ uri: item.thumbnail_url ? `${baseUri}${item.thumbnail_url}` : `${baseUri}/images/posters/${item.uuid}` }} />
      <View style={{ flexShrink: 1 }}>
        <Text style={{ marginBottom: 2, flexGrow: 1, }}>{item.title}</Text>
        <Text lightColor={Colors.light.link} darkColor={Colors.dark.link}>{item.channel.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList data={data.videos.data}
      renderItem={renderItem}
      keyExtractor={item => `${item.id}`}
      onEndReached={() => {
        if (data.videos.current_page < data.videos.last_page && typeof fetchMore === 'function') {
          fetchMore({
            variables: {
              page: data.videos.current_page + 1,
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
    padding: 10,
    borderBottomColor: 'rgba(127, 127, 127, 0.2)',
    borderBottomWidth: 0.5,
  },
  thumbnail: {
    width: 128,
    height: 72,
    marginRight: 10,
  },
});
