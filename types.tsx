import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Init: undefined;
  Root: NavigatorScreenParams<BottomTabParamList> | undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type BottomTabParamList = {
  Videos: undefined;
  Channels: undefined;
  About: undefined;
};

export type VideosParamList = {
  VideosScreen: undefined;
  VideoSearchScreen: undefined;
  VideoScreen: {
    uuid: string,
    title: string,
  };
};

export type ChannelsParamList = {
  ChannelsScreen: undefined;
  ChannelSearchScreen: undefined;
  ChannelScreen: {
    uuid: string,
    title: string,
  };
};

export type AboutParamList = {
  AboutScreen: undefined;
};

export type Video = {
  id: number;
  uuid: string;
  channel_id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  poster_url: string;
  source_link: string;
  file_link: string;
  published_at: string;
  created_at: string;
  channel: Channel;
}

export type Channel = {
  id: number;
  uuid: string;
  type: string;
  title: string;
  description: string;
  image_url: string;
  image_url_lg: string;
  source_link: string;
  published_at: string;
  created_at: string;
}
