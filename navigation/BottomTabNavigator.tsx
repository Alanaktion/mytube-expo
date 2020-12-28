import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import VideosScreen from '../screens/VideosScreen';
import ChannelsScreen from '../screens/ChannelsScreen';
import AboutScreen from '../screens/AboutScreen';
import { BottomTabParamList, VideosParamList, ChannelsParamList, AboutParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Videos"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="Videos"
        component={VideosNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="videocam-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Channels"
        component={ChannelsNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="tv-outline" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="About"
        component={AboutNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const VideosStack = createStackNavigator<VideosParamList>();

function VideosNavigator() {
  return (
    <VideosStack.Navigator>
      <VideosStack.Screen
        name="VideosScreen"
        component={VideosScreen}
        options={{ headerTitle: 'Videos' }}
      />
    </VideosStack.Navigator>
  );
}

const ChannelsStack = createStackNavigator<ChannelsParamList>();

function ChannelsNavigator() {
  return (
    <ChannelsStack.Navigator>
      <ChannelsStack.Screen
        name="ChannelsScreen"
        component={ChannelsScreen}
        options={{ headerTitle: 'Channels' }}
      />
    </ChannelsStack.Navigator>
  );
}

const AboutStack = createStackNavigator<AboutParamList>();

function AboutNavigator() {
  return (
    <AboutStack.Navigator>
      <AboutStack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{ headerTitle: 'About' }}
      />
    </AboutStack.Navigator>
  );
}
