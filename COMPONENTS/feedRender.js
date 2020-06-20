import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../RESPONSIVE";
import { Video } from "expo-av";
import Avatar from "../COMPONENTS/Avatar";
const FeedRender = (props) => {
  const {
    name,
    description,
    mediaType,
    media,
    date,
    onPress
  } = props;
  console.log(description,mediaType);
  return (
    <TouchableOpacity style={styles.container} onPress={()=>{console.log(media,description)}}>
      <View style={styles.avatarLeft}>
        <Avatar />
      </View>
      <View style={styles.rightDescription}>
        <View style={{ paddingTop: 10 }}>
          <Text style={styles.Title} numberOfLines={1}>
            {name}
          </Text>
          <Text style={styles.date} numberOfLines={1}>
            {date}
          </Text>
          {description && (
            <Text style={styles.description} numberOfLines={3}>
              {description}
            </Text>
          )}
        </View>
        {media &&
          <View style={{ alignItems: "center", marginTop: 10 }}>
          <View style={styles.imageContainer}>
         
            {mediaType === "Images" &&
              <Image
                source={{
                  uri: media,
                }}
                style={styles.img}
              />
             }{mediaType === "Videos" &&
              <Video
                source={{
                  uri: media,
                }}
                isLooping={false}
                useNativeControls
                autoplay={false}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                style={styles.img}
              />
            }
          </View>
        </View>
        }

      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: "auto",
    maxHeight: hp("95%"),
    width: wp("90%"),
    justifyContent: "center",
    backgroundColor: "#f5f7fa",
    marginVertical: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
  },
  avatarLeft: {
    width: "20%",
    height: "50%",
    alignItems: "center",
    paddingTop: 10,
  },
  img: {
    height: "100%",
    width: "100%",
    overflow: "hidden",
    
  },
  rightDescription: {
    width: "80%",
    height: "50%",
    height: "auto",
    paddingBottom: 3,
    // maxHeight: hp("95%"),
    // backgroundColor:'blue'
    //  borderLeftWidth: 1,
  },
  imageContainer: {
    height: hp("30%"),
    width: "98%",
    borderRadius: wp("4%"),
    backgroundColor: "black",
    overflow: "hidden",
    borderWidth:1
  },
  description: {
    fontSize: hp("2.4%"),
  },
  Title: {
    fontSize: hp("3.4%"),
    fontWeight: "bold",
  },
  date: {
    fontSize: hp("2%"),
    color: "#808080",
  },
});

export default FeedRender;
