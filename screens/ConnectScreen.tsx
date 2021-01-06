import AsyncStorage from '@react-native-async-storage/async-storage';
import * as React from 'react';
import { Button, StyleSheet } from 'react-native';
import { setBaseUri } from '../api/Client';

import { Text, TextInput, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { AuthContext } from '../navigation';

type Props = {
  navigation: any;
};

export default function ConnectScreen({ navigation }: Props) {
  const [value, onChangeText] = React.useState('');

  const { setUri } = React.useContext(AuthContext);

  const connect = async () => {
    const isUrl = isValidHttpUrl(value);
    if (isUrl) {
      const baseUri = value.replace(/\/$/, '');
      setBaseUri(baseUri);
      await AsyncStorage.setItem('baseUri', baseUri);
      setUri(baseUri);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 25 }}>
        <Text
          lightColor={Colors.light.link}
          darkColor={Colors.dark.link}
          style={styles.title}>
          MyTube
        </Text>
      </View>
      <View style={styles.formRow}>
        <Text>Enter a MyTube instance URL to get started:</Text>
      </View>
      <View style={styles.formRow}>
        <TextInput
          style={styles.input}
          onChangeText={text => onChangeText(text)}
          value={value}
          autoCapitalize="none"
          autoCompleteType="off"
          autoFocus
          keyboardType="url"
        />
      </View>
      <View style={styles.formRow}>
        <Text
          lightColor={Colors.light.muted}
          darkColor={Colors.dark.muted}>
          This should include a protocol, domain, and optional trailing slash.
        </Text>
      </View>
      <View style={{ padding: 15 }}>
        <Button title="Connect" onPress={() => { connect() }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  formRow: {
    marginTop: 5,
    paddingHorizontal: 15,
  },
  input: {
    borderColor: 'rgba(127, 127, 127, 0.5)',
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 2,
  },
});

function isValidHttpUrl(str: string) {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?\\/?$', // port and path
    'i'
  );
  return pattern.test(str);
}
