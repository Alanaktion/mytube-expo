import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Icon, View } from '../components/Themed';
import { ChannelList } from '../components/ChannelList';
import { Channel, ChannelsParamList } from '../types';
import Colors from '../constants/Colors';

type Props = NativeStackScreenProps<ChannelsParamList, 'ChannelsScreen'>;

export default function ChannelsScreen({ navigation }: Props) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ChannelSearchScreen');
          }}
          style={{ marginRight: 10, paddingHorizontal: 5 }}
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
