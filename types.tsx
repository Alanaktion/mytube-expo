import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Loading: undefined;
  Init: undefined;
  Root: NavigatorScreenParams<BottomTabParamList> | undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

// Typescript is dumb, circular references are really required here but not supported, so we just use undefined instead.
// This will show type errors in nested navigate() calls, but they do still work.

export type BottomTabParamList = {
  Videos: undefined; // NavigatorScreenParams<VideosParamList> | undefined;
  Channels: undefined; // NavigatorScreenParams<ChannelsParamList> | undefined;
  About: undefined; // NavigatorScreenParams<AboutParamList> | undefined;
};

export type VideosParamList = {
  VideosScreen: undefined;
  VideoSearchScreen: undefined;
  VideoScreen: {
    uuid: string,
    title: string,
  };
} & BottomTabParamList;

export type ChannelsParamList = {
  ChannelsScreen: undefined;
  ChannelSearchScreen: undefined;
  ChannelScreen: {
    uuid: string,
    title: string,
  };
} & BottomTabParamList;

export type AboutParamList = {
  AboutScreen: undefined;
} & BottomTabParamList;

export type Video = {
  id: number;
  uuid: string;
  channel_id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  poster_url: string;
  source_link: string;
  published_at: string;
  created_at: string;
  channel: Channel;
  files: VideoFile[];
}

export type VideoFile = {
  id: number;
  url: string;
  mime_type: string;
  created_at: string;
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
