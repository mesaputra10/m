import * as React from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  ImageBackground
} from "react-native";
import { Button, Card, Icon, Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;
const BG_IMAGE = require("../../assets/images/ilLoginGetAccess.png");
export default class WelcomeScreen extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      text: "",
      password: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <KeyboardAvoidingView style={styles.loginContainer} behavior="position">
            <Button
              buttonStyle={{
                borderRadius: 5,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
                marginTop: 270,
                width: 336,
                height: 56,
                flexDirection: "row"
              }}
              titleStyle={{ fontWeight: "bold", fontSize: 18 }}
              title="LOGIN"
              onPress={this._signinAsync}
            />
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }

  _signinAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    this.props.navigation.navigate("Auth");
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  bgImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
    justifyContent: "center",
    alignItems: "center"
  },
  loginContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  formContainer: {
    // width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: "center"
  }
});
