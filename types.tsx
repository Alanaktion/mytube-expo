import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Loading: undefined;
  Init: undefined;
  Root: NavigatorScreenParams<BottomTabParamList> | undefined;
  NotFound: undefined;
  VideoScreen: {
    uuid: string,
    title: string,
  };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

// Circular references are ideal here but not supported, so we just use any instead.

export type BottomTabParamList = {
  Videos: any; // NavigatorScreenParams<VideosParamList> | undefined;
  Channels: any; // NavigatorScreenParams<ChannelsParamList> | undefined;
  About: any; // NavigatorScreenParams<AboutParamList> | undefined;
};

export type VideosParamList = {
  VideosScreen: any;
  VideoSearchScreen: any;
  VideoScreen: RootStackParamList["VideoScreen"];
} & BottomTabParamList;

export type ChannelsParamList = {
  ChannelsScreen: any;
  ChannelSearchScreen: any;
  ChannelScreen: {
    uuid: string,
    title: string,
  };
  VideoScreen: RootStackParamList["VideoScreen"];
} & BottomTabParamList;

export type AboutParamList = {
  AboutScreen: any;
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
