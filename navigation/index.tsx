import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApolloClient } from '@apollo/client';
import * as SplashScreen from 'expo-splash-screen';

import ConnectScreen from '../screens/ConnectScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import { Cache, ClientContext } from '../api/Client';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

type Action = {
  type: 'RESTORE_URI'|'SET_URI'|'CLEAR_URI';
  uri?: string|null;
};

function RootNavigator() {
  const [state, dispatch] = React.useReducer(
    (prevState: any, action: Action) => {
      switch (action.type) {
        case 'RESTORE_URI':
          return {
            ...prevState,
            isLoading: false,
            baseUri: action.uri,
          };
        case 'SET_URI':
          return {
            ...prevState,
            isClearing: false,
            baseUri: action.uri,
          };
        case 'CLEAR_URI':
          return {
            ...prevState,
            isClearing: true,
            baseUri: null,
          };
      }
    },
    {
      isLoading: true,
      isClearing: false,
      baseUri: null,
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      await SplashScreen.preventAutoHideAsync();

      // Fetch the base URI from storage then navigate to the appropriate screen
      let val;
      try {
        val = await AsyncStorage.getItem('baseUri');
      } catch (e) {
        // Restoring base URI failed
      }
      dispatch({ type: 'RESTORE_URI', uri: val });

      await SplashScreen.hideAsync();
    };

    bootstrapAsync();
  }, []);

  const clientContext = React.useMemo(
    () => ({
      setUri: async (value: string) => {
        // This function is called by the connect screen to set the base URI
        await AsyncStorage.setItem('baseUri', value);
        dispatch({ type: 'SET_URI', uri: value });
      },
      clearUri: async () => {
        // This function is called by the about screen to clear the base URI
        await AsyncStorage.clear();
        dispatch({ type: 'CLEAR_URI' });
      },
      client: state.baseUri !== null ? new ApolloClient({
        uri: `${state.baseUri}/graphql`,
        cache: Cache,
      }) : null,
      baseUri: state.baseUri,
    }),
    [state.baseUri]
  );

  if (state.isLoading) {
    return null;
  }

  return (
    <ClientContext.Provider value={clientContext}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {
            state.baseUri === null ?
            <Stack.Screen name="Init" component={ConnectScreen} options={{
              animationTypeForReplace: state.isClearing ? 'pop' : 'push',
            }} /> :
            <Stack.Screen name="Root" component={BottomTabNavigator} />
          }
          <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        </Stack.Navigator>
    </ClientContext.Provider>
  );
}
