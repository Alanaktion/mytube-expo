import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { VideoList } from '../components/VideoList';
import { Video } from '../types';

export default function VideosScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <VideoList onItemPress={(video: Video) => {
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
});
