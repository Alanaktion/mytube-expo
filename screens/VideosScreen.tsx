import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { VideoList } from '../components/VideoList';

export default function VideosScreen() {
  return (
    <View style={styles.container}>
      <VideoList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
