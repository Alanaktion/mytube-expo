import * as Linking from 'expo-linking';

export default {
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
