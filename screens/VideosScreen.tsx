import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Icon, View } from '../components/Themed';
import { VideoList } from '../components/VideoList';
import { Channel, Video, VideosParamList } from '../types';
import Colors from '../constants/Colors';

type Props = NativeStackScreenProps<VideosParamList, 'VideosScreen'>;

export default function VideosScreen({ navigation }: Props) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('VideoSearchScreen');
          }}
          accessibilityLabel="Search"
        >
          <Icon
            name="search"
            size={22}
            lightColor={Colors.light.link}
            darkColor={Colors.dark.link}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <VideoList
        onItemPress={(video: Video) => {
          navigation.navigate('VideoScreen', {
            uuid: video.uuid,
            title: video.title,
          });
        }}
        onChannelPress={(channel: Channel) => {
          navigation.navigate('Channels', {
            screen: 'ChannelScreen',
            initial: false,
            params: {
              uuid: channel.uuid,
              title: channel.title,
            }
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
