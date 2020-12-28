import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { gql, useQuery } from "@apollo/react-hooks";

import { Icon, Text } from "./Themed";

const VIDEOS_QUERY = gql`
  {
    videos(page: 1) {
      data {
        id
        uuid
        title
        channel {
          id
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

export function VideoList() {
  const { data, loading, error } = useQuery(VIDEOS_QUERY);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator />
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

  return (
    <FlatList data={data.allItems.data} renderItem={videoItem} keyExtractor={item => item.id} />
  );
}

function videoItem(video: any) {
  return (
    <View>
      <Text>{video.title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
});
