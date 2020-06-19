import React from "react";
import { StyleSheet, Text, View } from "react-native";
import NAVIGATION from "./navigation/NAVIGATION";
import firebaseConfig from "./config";
import firebase from "firebase";

import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import authReducer from "./store/reducers/auth-reducer";
import feedReducer from "./store/reducers/feed";

export default function App() {
  firebase.initializeApp(firebaseConfig);
  const rootReducer = combineReducers({
    auth: authReducer,
    feed: feedReducer,
  });

  const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
  return (
    <Provider store={store}>
      <NAVIGATION />
    </Provider>
  );
}
