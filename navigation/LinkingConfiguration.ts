import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

import { RootStackParamList } from '../types';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Videos: {
            screens: {
              VideosScreen: 'videos',
            },
          },
          Channels: {
            screens: {
              ChannelsScreen: 'channels',
            },
          },
          About: {
            screens: {
              AboutScreen: 'about',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};

export default linking;
