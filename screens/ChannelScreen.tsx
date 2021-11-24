import { gql, useQuery } from '@apollo/client';
import * as React from 'react';
import { ActivityIndicator, Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HeaderTitle } from '@react-navigation/elements';

import { Icon, Text, View } from '../components/Themed';
import { VideoList } from '../components/VideoList';
import { ClientContext } from '../api/Client';
import { Channel, ChannelsParamList, Video } from '../types';

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

type Props = NativeStackScreenProps<ChannelsParamList, 'ChannelScreen'>;

export default function ChannelScreen({ route, navigation }: Props) {
  const { uuid, title } = route.params;
  const { data, loading, error } = useQuery(CHANNEL_QUERY, {
    variables: {
      uuid,
    },
    fetchPolicy: 'network-only',
  });
  const { baseUri } = React.useContext(ClientContext);
  const channel: Channel = data?.channels ? data.channels.data[0] : null;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.header}>
          {channel?.image_url &&
            <Image source={{ uri: `${baseUri}${channel.image_url}` }} style={styles.headerAvatar} /> ||
            <View style={styles.headerAvatar} />
          }
          <HeaderTitle>{channel?.title || title}</HeaderTitle>
        </View>
      ),
    });
  }, [data]);

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

  return (
    <View style={styles.container}>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 5,
    backgroundColor: '#eee',
  },
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
