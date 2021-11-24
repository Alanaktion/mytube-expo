import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { View } from '../components/Themed';
import { VideoList } from '../components/VideoList';
import { Video, VideosParamList } from '../types';

type Props = NativeStackScreenProps<VideosParamList, 'VideoSearchScreen'>;

export default function VideoSearchScreen({ navigation }: Props) {
  const [searchText, setSearchText] = React.useState('');

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={{  }}
          onChangeText={text => setSearchText(text)}
          value={searchText}
          keyboardType="web-search"
          placeholder="Search terms"
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
    borderBottomColor: '#ddd',
    borderBottomWidth: 0.5,
    padding: 10,
  },
});
