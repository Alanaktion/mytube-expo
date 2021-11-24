import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { Icon, View } from '../components/Themed';
import { VideoList } from '../components/VideoList';
import Colors from '../constants/Colors';
import { Video, VideosParamList } from '../types';

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
      // headerSearchBarOptions: {
      //   placeholder: 'Search',
      //   hideWhenScrolling: false,
      // }
    });
  }, [navigation]);

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
