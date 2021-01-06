import * as React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { ClientContext } from '../api/Client';

export default function AboutScreen() {
  const { baseUri, clearUri } = React.useContext(ClientContext);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>MyTube</Text>
        <Text
          style={{ textAlign: 'center' }}
          lightColor={Colors.light.muted}
          darkColor={Colors.dark.muted}
        >
          {baseUri}
        </Text>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor={Colors.light.muted}
          darkColor={Colors.dark.muted}>
          This is a simple mobile app wrapping the <Text
            onPress={() => {Linking.openURL('https://github.com/Alanaktion/mytube')}}
            lightColor={Colors.light.link}
            darkColor={Colors.dark.link}>MyTube</Text> project.
        </Text>
        <Text
          style={styles.getStartedText}
          lightColor={Colors.light.muted}
          darkColor={Colors.dark.muted} >
          You can use it to browse and view content on self-hosted MyTube instances.
        </Text>
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={async () => {
          clearUri();
        }}
        style={{ marginTop: 30 }}
      >
        <Text
          style={styles.getStartedText}
          lightColor={Colors.light.link}
          darkColor={Colors.dark.link}
        >
          Reset App
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 5,
  },
});
