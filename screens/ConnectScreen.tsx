import * as React from 'react';
import { Button, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback, StyleSheet, Platform } from 'react-native';

import { Text, TextInput, View } from '../components/Themed';
import Colors from '../constants/Colors';
import { ClientContext } from '../api/Client';

export default function ConnectScreen() {
  const [value, onChangeText] = React.useState('');

  const { setUri } = React.useContext(ClientContext);

  const connect = async () => {
    const isUrl = isValidHttpUrl(value);
    if (isUrl) {
      // TODO: verify URI has a reachable GraphQL API with expected queries
      const baseUri = value.replace(/\/$/, '');
      setUri(baseUri);
    } else {
      alert('Please enter a valid URL. This should include a protocol, domain, and optional trailing slash.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: Colors.light.tint }}>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <View style={styles.form}>
              <View style={{ marginBottom: 25 }}>
                <Text style={styles.title}>MyTube</Text>
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
                  autoCorrect={false}
                  autoFocus
                  keyboardType="url"
                />
              </View>
              <View style={{ marginTop: 10 }}>
                <Button title="Connect" onPress={() => { connect() }} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    marginHorizontal: 15,
    paddingHorizontal: 15,
    paddingTop: 30,
    paddingBottom: 15,
    borderRadius: 10,
  },
  formRow: {
    marginTop: 5,
  },
  input: {
    borderColor: 'rgba(127, 127, 127, 0.5)',
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 5,
    paddingVertical: 3,
    fontSize: 16,
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
