import React, { useEffect, useState, useCallback } from "react";
import { View, Text, StyleSheet, Image, Alert } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../RESPONSIVE";
import Header from "../../COMPONENTS/Header";
import FeedRender from "../../COMPONENTS/feedRender";
import FloatAction from "../../COMPONENTS/FloatAction";
import {
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

import { useDispatch, useSelector } from "react-redux";
import * as authActions from '../../store/actions/auth'

import * as feed from "../../store/actions/feed";
const feedScreen = (props) => {
  const dispatch = useDispatch();

  const FEED = useSelector((state) => state.feed.FEEDS);
  const [error, setError] = useState();

  const [isLoading, setIsLoading] = useState(false);

  const load = useCallback(async () => {
    try {
      await dispatch(feed.fetch());
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, setIsLoading]);

  useEffect(() => {
    setIsLoading(true);
    load().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, load]);
  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const logout = useCallback(() => {
    Alert.alert(
      "Logout",
      "Are you sure?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            dispatch(authActions.logout());
            props.navigation.navigate("LOGIN");
          },
        },
      ],
      { cancelable: true }
    );
  }, [dispatch]);
  useEffect(() => {
    props.navigation.setParams({ log: logout });
  }, [dispatch]);

  return (
    <View style={{ flexGrow: 1 }}>
      <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center" }}>
        <Header HeaderTitle="Feed" />
        <FlatList
          keyExtractor={(item) => item.id}
          data={FEED.reverse()}
          renderItem={(itemData) => (
            <FeedRender
              name={itemData.item.Uname}
              description={itemData.item.description}
              date={itemData.item.date}
              media={itemData.item.media}
              mediaType={itemData.item.mediaType}
              onPress={() => {
                // props.navigation.navigate("FEED_DETAIL");
              }}
            />
          )}
        />
      </ScrollView>
    </View>
  );
};

feedScreen.navigationOptions = (navData) => {
  const logout = navData.navigation.getParam("log");
  return {
    headerTransparent: "true",
    headerRight: () => (
      <TouchableOpacity style={styles.logout} onPress={logout}>
        <AntDesign name="user" size={hp("5%")} color="white" />
      </TouchableOpacity>
    ),
  };
};

const styles = StyleSheet.create({
  logout: {
    marginTop: -30,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default feedScreen;
