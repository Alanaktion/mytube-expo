import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Dimensions, Image, ScaledSize, ScrollView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Video as VideoPlayer } from 'expo-av';
import { gql, useQuery } from '@apollo/client';

import { Icon, Text, View } from '../components/Themed';
import { Video, VideosParamList } from '../types';
import Colors from '../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ClientContext } from '../api/Client';

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
        published_at
        created_at
        channel {
          uuid
          title
          image_url
        }
        files {
          id
          url
          mime_type
        }
      }
    }
  }
`;

const window = Dimensions.get('window');

type Props = NativeStackScreenProps<VideosParamList, 'VideoScreen'>;

export default function VideosScreen({ route, navigation }: Props) {
  const { uuid } = route.params;
  const { data, loading, error } = useQuery(VIDEO_QUERY, {
    variables: {
      uuid,
    },
    fetchPolicy: 'network-only',
  });
  const [dimensions, setDimensions] = useState({ window });
  const ref = useRef(null);

  const onChange = ({ window }: { window: ScaledSize }) => {
    setDimensions({ window });
  }
  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    return () => {
      Dimensions.removeEventListener('change', onChange);
    };
  });
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
        <Text>Failed to load video.</Text>
      </View>
    );
  }

  const video: Video = data.videos.data[0];
  const { channel } = video;

  const playerHeight = Math.round(dimensions.window.width / 16 * 9);
  const posterUrl = video.poster_url ? `${baseUri}${video.poster_url}` : `${baseUri}/images/posters/${video.uuid}`;
  const fileUrl = video.files[0]?.url;

  return (
    <View style={styles.container}>
      {fileUrl ?
        <VideoPlayer
          source={{ uri: `${baseUri}${fileUrl}` }}
          resizeMode="contain"
          useNativeControls
          shouldPlay
          usePoster
          posterSource={{ uri: posterUrl }}
          style={{ height: playerHeight }}
          ref={ref}
        /> :
        <View style={{ position: 'relative' }}>
          <Image
            source={{ uri: posterUrl }}
            style={{ width: dimensions.window.width, height: playerHeight }}
            blurRadius={10}
          />
          <View style={styles.videoPlaceholder}>
            <Text lightColor="#FCA5A5" darkColor="#FCA5A5">No video file available.</Text>
          </View>
        </View>
      }
      <ScrollView>
        <View style={styles.meta}>
          <Text style={styles.title}>{video.title}</Text>
          <TouchableOpacity style={styles.channel} activeOpacity={0.6} onPress={() => {
            navigation.navigate('Channels', {
              screen: 'ChannelScreen',
              initial: false,
              params: {
                uuid: channel.uuid,
                title: channel.title,
              },
            });
          }}>
            {channel.image_url &&
              <Image source={{ uri: `${baseUri}${channel.image_url}` }} style={styles.avatar} />
            }
            <Text lightColor={Colors.light.link} darkColor={Colors.dark.link}>{channel.title}</Text>
          </TouchableOpacity>
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
  videoPlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
