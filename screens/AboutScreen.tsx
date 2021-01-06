import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Client, getBaseUri } from '../api/Client';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { AuthContext } from '../navigation';

export default function AboutScreen() {
  const { clearUri } = React.useContext(AuthContext);

  const baseUri = getBaseUri();

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
          darkColor={Colors.dark.muted}
        >
          This app is a work in progress, and is not really useful right now.
        </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={async () => {
            await Client.resetStore();
            clearUri();
          }}
          style={{ marginTop: 15 }}
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
  },
});
