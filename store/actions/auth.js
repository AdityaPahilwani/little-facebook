import { AsyncStorage } from 'react-native';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const LOGOIN = 'LOGOIN';
import firebase from 'firebase';


export const authenticate = (userId, name) => {
  return dispatch => {
    dispatch({ type: AUTHENTICATE, 
      userId: userId,
      name:name
    });
  };
};



export const signup = (email, password) => {
  return async dispatch => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      var user = firebase.auth().currentUser;
      firebase
        .database()
        .ref('/users/' + user.uid)
        .push({
          name:email
        }).then(() => { console.log('success') });
      saveDataToStorage(user.uid,email);
      dispatch(authenticate(user.uid,email));
    }
    catch (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      let message;
      if (errorCode == 'auth/weak-password') {
        message = 'The password is too weak.';
      }
      else if (errorCode === 'auth/email-already-in-use') {
        message = 'The email already exists';
      }
      else {

        message = errorMessage;
      }
      throw new Error(message);
    };
  };
};

export const login = (email, password) => {
  return async dispatch => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
      var user = firebase.auth().currentUser;
      saveDataToStorage(user.uid,email);
      dispatch(authenticate(user.uid,email));
    }
    catch (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      let message;
      if (errorCode === 'auth/wrong-password') {
        message = 'Wrong password.'
      }
      else if (errorCode === 'auth/user-not-found') {
        message = 'User not found.'
      }
      else {
        message = errorMessage;
      }
      console.log(message);
      throw new Error(message);
    };
  }
};

const saveDataToStorage = async (userId,name) => {
  console.log(userId,name+'lllll');
  
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      userId: userId,
      name:name
    })
  );
};

export const logout = () => {
  AsyncStorage.removeItem('userData');
  return { type: LOGOUT };
};




























