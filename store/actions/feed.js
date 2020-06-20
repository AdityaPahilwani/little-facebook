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

    if (!media) {
      media = false;
      mediaType = false;
    }
    if (!description) {
      description = false;
    }
    if (media) {
      uploadUrl = await uploadImageAsync(media, userId);
      media = uploadUrl;
      console.log(uploadUrl, mediaType);
    }
    console.log(mediaType, media);
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
  return async (dispatch) => {
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
    }).then(() => {
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
      });
    });
  };
};

const handleUpload = async (media) => {
  const data = new FormData();
  data.append("file", media);
  data.append("upload_preset", "little-facebook");
  data.append("cloud_name", "Aditya8989");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/Aditya8989/image/upload",
    {
      method: "post",
      body: data,
    }
  );

  console.log(res);
};

async function uploadImageAsync(uri, uid) {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      console.log(e);
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  const ref = firebase.storage().ref(uid).child("temp");
  const snapshot = await ref.put(blob);

  blob.close();

  return await snapshot.ref.getDownloadURL();
}
