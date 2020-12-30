import * as React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Client } from '../api/Client';

import { Text, View } from '../components/Themed';
import Colors from '../constants/Colors';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>MyTube</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          This app is a work in progress, and is not really useful right now.
        </Text>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={async () => {
            await Client.resetStore();
            alert('Cache reset!');
          }}
          style={{ marginTop: 15 }}
        >
          <Text style={styles.getStartedText} lightColor={Colors.light.link} darkColor={Colors.dark.link}>Reset Cache</Text>
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
