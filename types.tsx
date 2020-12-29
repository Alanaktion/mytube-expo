export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Videos: undefined;
  Channels: undefined;
  About: undefined;
};

export type VideosParamList = {
  VideosScreen: undefined;
  VideoScreen: undefined;
};

export type ChannelsParamList = {
  ChannelsScreen: undefined;
  ChannelScreen: undefined;
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
