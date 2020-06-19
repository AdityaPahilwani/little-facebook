import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../RESPONSIVE";

const Avatar = (props) => {
  return (
    <View style={styles.avatarContainer}>
      <Image source={require("../IMAGES/avatar.jpg")} style={styles.img} />
    </View>
  );
};

const styles=StyleSheet.create({
    avatarContainer: {
        height: wp("13%"),
        width: wp("13%"),
        borderRadius: wp("4%"),
        backgroundColor: "white",
        overflow: "hidden",
      },
      img: {
        height: "100%",
        width: "100%",
        overflow: "hidden",
      }
})

export default Avatar