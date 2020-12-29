import * as React from 'react';
import { StyleSheet } from 'react-native';

import { View } from '../components/Themed';
import { ChannelList } from '../components/ChannelList';
import { Channel } from '../types';

export default function ChannelsScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <ChannelList onItemPress={(channel: Channel) => {
        navigation.navigate('ChannelScreen', {
          uuid: channel.uuid,
          title: channel.title,
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
