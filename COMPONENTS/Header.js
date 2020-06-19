import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../RESPONSIVE";
import Colors from "../Constants/Colors";

const Header = (props) => {
  const { HeaderTitle } = props;
  return (
    <View style={styles.Headerbg}>
      <Text style={styles.HeaderText}>{HeaderTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  Headerbg: {
    width: "100%",
    height: "10%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    // borderBottomLeftRadius: 35,
    // borderBottomRightRadius: 35,
  },
  HeaderText: {
    fontSize: hp("4%"),
    fontWeight: "bold",
    color: Colors.accent,
    fontFamily: "monospace",
  },
});

export default Header;
