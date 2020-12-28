import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { ChannelList } from '../components/ChannelList';

export default function ChannelsScreen() {
  return (
    <View style={styles.container}>
      <ChannelList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
