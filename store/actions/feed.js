export const INSERT = "INSERT";
export const FETCH = "FETCH";
import firebase from "firebase";
import feed from "../../Models/feed";
import { AsyncStorage } from "react-native";

// Storing UserName in feed collection because my app doesn't provide feature to edit userName
export const insert = (description, media, mediaType) => {
  return async (dispatch, getState) => {
    let userData = await AsyncStorage.getItem("userData");
    userData = JSON.parse(userData);
    const userId = userData.userId;
    const Uname = userData.name;
    const date = new Date();
    console.log(userId + "ll");
    console.log(media);
    let id = "description" + Math.random();

    // let id1 = description+ Math.random();
    // const response = await fetch(media);
    // const blob = await response.blob();
    // var ref = firebase.storage().ref(`${userId}`).child(id1);
    // const picurl = await ref.put(blob);
    // var url = await ref.getDownloadURL();

    // this whole block of code isn't working looks fine but doesn't work
    console.log(mediaType);
    firebase
      .database()
      .ref("/Feed/")
      .push({
        media: media,
        description: description,
        createdBy: userId,
        mediaType: mediaType,
        Uname: Uname,
        date: date.toISOString(),
      })
      .then(function (snapshot) {
        var key = snapshot.key;
        var newFeed = new feed(
          key,
          description,
          media,
          mediaType,
          Uname,
          date.toISOString()
        );
        dispatch({ type: INSERT, newFeed: newFeed });
      });
  };
};

export const fetch = () => {
  return async dispatch => {
    let key;
    let FeedArr = [];
    let Feed;
    let res;
    const myPromise = new Promise((resolve, reject) => {
    firebase
      .database()
      .ref("/Feed/")
      .on("value", function (dataSnapshot) {
        res = dataSnapshot.toJSON();
        resolve(res);
      });
    }).then(()=>{
        for (key in res) {
            Feed = new feed(
              key,
              res[key]["description"],
              res[key]["media"],
              res[key]["mediaType"],
              res[key]["Uname"],
              res[key]["date"]
            );
            console.log(Feed);
            FeedArr.push(Feed);
          }
          Promise.all(FeedArr).then((values) => {
            dispatch({ type: FETCH, FEED: FeedArr });
          })
         
    })
  };
};
