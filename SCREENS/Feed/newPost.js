import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Alert,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../RESPONSIVE";
import Colors from "../../Constants/Colors";
import Header from "../../COMPONENTS/Header";
import Avatar from "../../COMPONENTS/Avatar";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import CustomButton from "../../COMPONENTS/CustomButton";
import { Video } from "expo-av";
import { ActivityIndicator } from "react-native-paper";
import { useDispatch } from "react-redux";

import * as feed from "../../store/actions/feed";

const NEW_POST = (props) => {
  const [pickedMedia, setPickedMedia] = useState();
  const [type1, setType1] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [description, setDescription] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  let type;

  const savePost = async () => {
    if ((description === "", pickedMedia === "")) {
      setError("Please all details");
      return;
    }
    try {
      setIsLoading(true);
      await dispatch(feed.insert(description, pickedMedia, type1));
      props.navigation.goBack();
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const willFocus = props.navigation.addListener("willFocus", clearData);

    return () => {
      willFocus.remove();
    };
  }, [clearData]);
  const clearData = () => {
    setPickedMedia();
    setDescription();
    setError();
    setIsLoading();
  };
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);

    if (result.status !== "granted") {
      Alert.alert(
        "Insufficient permissions",
        "You need to grant camera permission",
        [{ text: "Okay" }]
      );
      return false;
    }
    return true;
  };
  const mediaHandler = async () => {
    const hasPermission = await verifyPermissions();
    let media;
    if (!hasPermission) {
      return;
    }
    console.log(type,type1)
    if (type === "Videos") {
      console.log(type+'n');
      media = ImagePicker.MediaTypeOptions.Videos;
    } else if (type === "Images") {
      console.log(type+'in');
      media = ImagePicker.MediaTypeOptions.Images;
    }
     setType1(type);
    const mediaResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: media,
      allowsEditing: true,
      quality: 0.1,
    });
    setPickedMedia(mediaResult.uri);
  };

  const mediaSet = async (type1) => {
    type=type1
    await setType1(type1);
    mediaHandler();
  };
  return (
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <Header HeaderTitle="Add Post" />
      <View
        style={{
          flexDirection: "row",
          marginTop: 30,
          justifyContent: "space-evenly",
        }}
      >
        <Avatar />

        <TextInput
          style={styles.textInput}
          multiline={true}
          value={description}
          onChangeText={(text) => {
            setDescription(text);
          }}
          placeholder="Description"
        />
      </View>
      <View style={styles.media}>
        {pickedMedia && type1 === "Videos" ? (
          <Video
            source={{
              uri: pickedMedia,
            }}
            isLooping={false}
            useNativeControls
            autoplay={false}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            style={styles.mediaStyle}
          />
        ) : (
          <Image
            source={{
              uri: pickedMedia,
            }}
            style={styles.mediaStyle}
          />
        )}
      </View>
      {isLoading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="small" color={Colors.primary} />
        </View>
      ) : (
        <>
          <CustomButton title="Video" onPress={mediaSet.bind(this, "Videos")} />
          <CustomButton
            title="Camera"
            onPress={mediaSet.bind(this, "Images")}
          />
          <CustomButton title="Save" onPress={savePost} />
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    width: "80%",
    backgroundColor: "#efeeee",
    borderRadius: 15,
    padding: 10,
    //borderBottomWidth: 1,
  },
  mediaStyle: {
    width: wp("90%"),
    height: hp("35%"),
    borderRadius: 20,
  },

  media: {
    flex: 1,
    alignItems: "center",
    marginTop: 30,
  },
});

NEW_POST.navigationOptions = (navData) => {
  return {};
};
export default NEW_POST;
