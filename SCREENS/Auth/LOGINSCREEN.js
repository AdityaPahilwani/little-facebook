import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Constants, Svg } from "expo";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "../../RESPONSIVE";
import { useDispatch } from "react-redux";
import Color from "../../Constants/Colors";
import * as authActions from '../../store/actions/auth'
import { ActivityIndicator } from "react-native-paper";
import Colors from "../../Constants/Colors";

let BORDER_RADIUS = 10;

const LOGINSCREEN = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error,setError]=useState();
  const [auth, setAuth] = useState("Sign in");
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();

  const dispatch=useDispatch();
  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const AuthHandler = async () => {
    if (email === "" && pass === "") {
      setError("Check Inputs");
      console.log('hekkky');
      return;
    }
    let action;
    if (auth === "Sign up") {
      action = authActions.signup(email, pass);
    } else if (auth === "Sign in") {
      action = authActions.login(email, pass);
    }
    setError(null);
    setIsLoading(true);
   
    try {
      console.log('heyyyy');
      await dispatch(action);
      props.navigation.navigate("Feed");
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleAuthText = () => {
    if (auth === "Sign in") {
      setAuth("Sign up");
    } else if (auth === "Sign up") {
      setAuth("Sign in");
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <StatusBar />
      <View style={styles.backgroundPrototype}>
        <Image
          style={styles.logo}
          source={require("../../IMAGES/organization.png")}
        />
      </View>

      <View style={styles.loginHalf}>
        <View style={styles.inputContainer}>
          <Text style={styles.placeHolderText}>Email</Text>
          <TextInput
            underlineColorAndroid="transparent"
            onChangeText={(text) => {
              setEmail(text);
            }}
            style={styles.textInput}
          />
          <Text style={styles.placeHolderText}>Password</Text>
          <TextInput
            underlineColorAndroid="transparent"
            secureTextEntry
            onChangeText={(text) => {
              setPass(text);
            }}
            style={styles.textInput}
          />
                      {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <>
          <TouchableOpacity style={styles.authButton} onPress={AuthHandler}>
            <Text style={styles.authText}>{auth}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.signTextArea}
            onPress={handleAuthText}
          >

              <Text style={styles.signText}>
                Switch to {auth === "Sign up" ? "Sign in" : "Sign up"}
              </Text>
           
          </TouchableOpacity>
          </>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundPrototype: {
    width: "100%",
    height: "33%",
    backgroundColor: Color.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  loginHalf: {
    height: "70%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Color.accent,
    marginTop: -hp("4%"),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  logo: {
    width: wp("20%"),
    height: hp("20%"),
    resizeMode: "contain",
  },
  Header: {
    fontSize: hp("5%"),
    fontWeight: "300",
  },
  textInput: {
    backgroundColor: "#efeeee",
    borderTopLeftRadius: BORDER_RADIUS,
    borderTopRightRadius: BORDER_RADIUS,
    borderRadius: BORDER_RADIUS,
    width: "100%",
    height: "13%",
    marginVertical: 10,
    padding: 10,
  },
  inputContainer: {
    width: "80%",
  },
  authButton: {
    width: "100%",
    height: "13%",
    backgroundColor: Color.primary,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  authText: {
    fontSize: hp("3%"),
    fontWeight: "300",
  },
  placeHolderText: {
    marginLeft: 5,
    fontSize: hp("2.3%"),
    fontWeight: "200",
  },
  signTextArea: {
    marginVertical: 20,
    alignItems: "center",
  },
  signText: {
    fontSize: hp("2.3%"),
    fontWeight: "200",
  },
});

export default LOGINSCREEN;
