import React from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import { gql, useQuery } from "@apollo/react-hooks";

import { Icon, Text } from "./Themed";

const CHANNELS_QUERY = gql`
  {
    channels(page: 1) {
      data {
        id
        uuid
        type
        title
      }
      current_page
      last_page
      total
    }
  }
`;

export function ChannelList() {
  const { data, loading, error } = useQuery(CHANNELS_QUERY);

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
        <Text>Failed to load channels.</Text>
      </View>
    );
  }

  return (
    <FlatList data={data.allItems.data} renderItem={ChannelItem} keyExtractor={item => item.id} />
  );
}

function ChannelItem(channel: any) {
  return (
    <View>
      <Text>{channel.title}</Text>
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
