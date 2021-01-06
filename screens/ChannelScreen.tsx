import { gql, useQuery } from '@apollo/client';
import * as React from 'react';
import { ActivityIndicator, Image, StyleSheet } from 'react-native';

import { Icon, Text, View } from '../components/Themed';
import { VideoList } from '../components/VideoList';
import { ClientContext } from '../api/Client';
import { Channel, Video } from '../types';

const CHANNEL_QUERY = gql`
  query Channel($uuid: String!) {
    channels(uuid: $uuid) {
      data {
        id
        uuid
        title
        image_url
        description
        published_at
      }
    }
  }
`;

type Props = {
  route: any;
  navigation: any;
};

export default function ChannelScreen({ route, navigation }: Props) {
  const { uuid } = route.params;
  const { data, loading, error } = useQuery(CHANNEL_QUERY, {
    variables: {
      uuid,
    },
    fetchPolicy: 'network-only',
  });

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
        <Text>Failed to load channel.</Text>
      </View>
    );
  }

  const channel: Channel = data.channels.data[0];

  const { baseUri } = React.useContext(ClientContext);
  return (
    <View style={styles.container}>
      {/* {channel.image_url &&
        <View style={styles.channel}>
          <Image source={{ uri: `${baseUri}${channel.image_url}` }} style={styles.avatar} />
        </View>
      } */}
      <VideoList channelId={channel.id} onItemPress={(video: Video) => {
        navigation.navigate('VideoScreen', {
          uuid: video.uuid,
          title: video.title,
        });
      }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  channel: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
});
