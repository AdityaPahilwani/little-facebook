import React from "react";
import { View, Text, StyleSheet } from "react-native";
import FloatAction from "../../COMPONENTS/FloatAction";
import { AntDesign } from "@expo/vector-icons";
import FeedRender from "../../COMPONENTS/feedRender";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../RESPONSIVE";
const FEED_DETAIL_SCREEN = (props) => {
  return (
    <View>
      <Text>Helloo</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

FEED_DETAIL_SCREEN.navigationOptions = (navigationData) => {
  return {
    headerTransparent: "true",
    headerLeft: (
      <FloatAction onPress={()=>{ navigationData.navigation.goBack();}}>
        <AntDesign name="back" size={hp("4%")} color="#12e2a3" />
      </FloatAction>
    ),
  };
};
export default FEED_DETAIL_SCREEN;
