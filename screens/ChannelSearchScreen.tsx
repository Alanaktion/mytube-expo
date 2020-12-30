import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { ChannelList } from '../components/ChannelList';

import { View } from '../components/Themed';
import { Channel } from '../types';

export default function ChannelSearchScreen({ navigation }: { navigation: any }) {
  const [searchText, setSearchText] = React.useState('');

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={{  }}
          onChangeText={text => setSearchText(text)}
          value={searchText}
          keyboardType="web-search"
          autoFocus
        />
      </View>
      {searchText.length > 0 &&
        <ChannelList search={searchText} onItemPress={(channel: Channel) => {
          navigation.navigate('ChannelScreen', {
            uuid: channel.uuid,
            title: channel.title,
          });
        }} />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    backgroundColor: '#eee',
    padding: 10,
  },
});
