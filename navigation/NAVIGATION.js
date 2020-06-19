import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator, HeaderTitle } from "react-navigation-stack";
import { Platform } from "react-native";
import { Ionicons, AntDesign, MaterialIcons, Entypo } from "@expo/vector-icons";
import Color from "../Constants/Colors";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../RESPONSIVE";

import LOGINSCREEN from "../SCREENS/Auth/LOGINSCREEN";
import LoadingScreen from "../SCREENS/Auth/LOADINGSCREEN";
import feedScreen from "../SCREENS/Feed/feed";
import FEED_DETAIL_SCREEN from "../SCREENS/Feed/feedDetail";
import NEW_POST from "../SCREENS/Feed/newPost";
import searchScreen from "../SCREENS/Feed/Search";

import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

const feedNav = createStackNavigator({
  FEED: feedScreen,
  FEED_DETAIL: FEED_DETAIL_SCREEN,
  POST: NEW_POST,
});

const tabScreenConfig = {
  Feed: {
    screen: feedNav,

    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <Entypo name="home" size={23} color={Color.accent} />;
      },
      tabBarColor: Color.primary,
      tabBarLabel: (
        <Text style={{ fontSize: hp("2%"), color: Color.text2 }}>Feed</Text>
      ),
    },
  },
  Post: {
    screen: NEW_POST,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <MaterialIcons name="add-circle" size={23} color={Color.accent} />
      },
      tabBarColor: Color.primary,
      tabBarLabel: null
    },
  },
  search: {
    screen: searchScreen,
    navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return <AntDesign name="search1" size={23} color={Color.accent} />;
      },
      tabBarColor: Color.primary,
      tabBarLabel: (
        <Text style={{ fontSize: hp("2%"), color: Color.text2 }}>search</Text>
      ),
    },
  },
};

const FeedTabNavigator =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator(tabScreenConfig, {
        activeColor: "white",
        shifting: true,
      })
    : createBottomTabNavigator(tabScreenConfig, {
        tabBarOptions: {
          labelStyle: {
            //for ios back button styling
          },
          activeTintColor: Color.accent,
        },
      });

const AuthNav = createSwitchNavigator({
  LOAD:LoadingScreen,
  LOGIN: LOGINSCREEN,
  Feed: FeedTabNavigator,
});
export default createAppContainer(AuthNav);
