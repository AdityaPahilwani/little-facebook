import React from "react";
import {

  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../RESPONSIVE";
import { AntDesign } from "@expo/vector-icons";
import Colors from "../Constants/Colors";

const CustomButton = (props) => {
  const { title ,onPress} = props;

  return (
    <TouchableOpacity style={styles.touchable} onPress={onPress}>
      <Text style={styles.btnFont}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  touchable: {
    height: hp("7%"),
    width: wp("100%"),
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.accent,
    borderWidth: 1,
  },
  btnFont:{ fontSize: hp("2%") }
});

export default CustomButton;
