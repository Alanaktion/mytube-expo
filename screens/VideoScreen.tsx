import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, ScaledSize, ScrollView, StyleSheet } from 'react-native';
import { Video as VideoPlayer } from 'expo-av';
import { gql, useQuery } from '@apollo/client';

import { Icon, Text, View } from '../components/Themed';
import { baseUri } from '../api/Client';
import { Video } from '../types';
import Colors from '../constants/Colors';

const VIDEO_QUERY = gql`
  query Videos($uuid: String!) {
    videos(uuid: $uuid) {
      data {
        id
        uuid
        title
        description
        poster_url
        source_link
        file_link
        published_at
        created_at
        channel {
          uuid
          title
          image_url
        }
      }
    }
  }
`;

const window = Dimensions.get('window');

type Props = {
  route: any;
  navigation: any;
};

export default function VideosScreen({ route }: Props) {
  const { uuid } = route.params;
  const { data, loading, error } = useQuery(VIDEO_QUERY, {
    variables: {
      uuid,
    },
  })
  const [dimensions, setDimensions] = useState({ window });

  const onChange = ({ window }: { window: ScaledSize }) => {
    setDimensions({ window });
  }
  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
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
        <Text>Failed to load video.</Text>
      </View>
    );
  }

  const video: Video = data.videos.data[0];
  const { channel } = video;

  return (
    <View style={styles.container}>
      <VideoPlayer
        source={{ uri: `${baseUri}${video.file_link}` }}
        resizeMode="contain"
        useNativeControls
        shouldPlay
        usePoster
        posterSource={{ uri: `${baseUri}${video.poster_url}` }}
        style={{ height: Math.round(dimensions.window.width / 16 * 9) }}
      />
      <ScrollView>
        <View style={styles.meta}>
          <Text style={styles.title}>{video.title}</Text>
          <View style={styles.channel}>
            {channel.image_url &&
              <Image source={{ uri: `${baseUri}${channel.image_url}` }} style={styles.avatar} />
            }
            <Text lightColor={Colors.light.link} darkColor={Colors.dark.link}>{channel.title}</Text>
          </View>
          <Text>{video.description}</Text>
        </View>
      </ScrollView>
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
  container: {
    flex: 1,
  },
  meta: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  channel: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 10,
  },
});
