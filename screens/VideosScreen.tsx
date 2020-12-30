import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Icon, View } from '../components/Themed';
import { VideoList } from '../components/VideoList';
import Colors from '../constants/Colors';
import { Video } from '../types';

export default function VideosScreen({ navigation }: { navigation: any }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('VideoSearchScreen');
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
