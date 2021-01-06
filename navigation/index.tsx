import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import ConnectScreen from '../screens/ConnectScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import { setBaseUri as setClientBaseUri } from '../api/Client';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

export const AuthContext = React.createContext({
  setUri: (value: string) => {},
  clearUri: () => {},
});

type Action = {
  type: string;
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
    // Fetch the base URI from storage then navigate to the appropriate screen
    const bootstrapAsync = async () => {
      let val;

      try {
        val = await AsyncStorage.getItem('baseUri');
        if (val !== null) {
          setClientBaseUri(val);
        }
      } catch (e) {
        // Restoring base URI failed
      }

      dispatch({ type: 'RESTORE_URI', uri: val });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      setUri: async (value: string) => {
        // This function is called by the connect screen to set the base URI
        dispatch({ type: 'SET_URI', uri: value });
      },
      clearUri: () => dispatch({ type: 'CLEAR_URI' }),
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
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
    </AuthContext.Provider>
  );
}
