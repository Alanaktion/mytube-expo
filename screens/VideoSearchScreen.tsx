import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';

import { View } from '../components/Themed';
import { VideoList } from '../components/VideoList';
import { Video } from '../types';

export default function VideoSearchScreen({ navigation }: { navigation: any }) {
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
        <VideoList search={searchText} onItemPress={(video: Video) => {
          navigation.navigate('VideoScreen', {
            uuid: video.uuid,
            title: video.title,
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
