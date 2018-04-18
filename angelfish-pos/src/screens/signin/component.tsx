import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableHighlight,
  Alert
} from "react-native";
import { Button, Card, Icon, Input } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import styles from "./styles";

const BG_IMAGE = require("../../../assets/images/ilLoginGetAccess.png");

export class SigninComponent extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      text: "",
      password: "",
      securePassword: true,
    };
  }
  toggleShowPassword(value) {
    this.setState({ securePassword: !value });
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <KeyboardAvoidingView style={styles.loginContainer} behavior="position">
            <Card
              title="Login"
              wrapperStyle={{ width: 400 }}
              containerStyle={styles.formContainer}
              dividerStyle={{ display: "none" }}
            >
              <View style={styles.fieldContainer}>
                <Input
                  keyboardAppearance="light"
                  autoFocus={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="email-address"
                  returnKeyType="next"
                  inputStyle={{ marginLeft: 10 }}
                  placeholder={"Email Bhinneka"}
                  containerStyle={{ borderBottomColor: "rgba(0, 0, 0, 0.38)" }}
                  onChangeText={email => this.setState({ email })}
                  value={this.state.email}
                />
                <Input
                  rightIcon={
                    <TouchableHighlight
                      onPress={() => this.toggleShowPassword(this.state.securePassword)}
                    >
                      <Ionicons
                        name="ios-eye-off-outline"
                        color="rgba(0, 0, 0, 0.38)"
                        size={25}
                        style={{ backgroundColor: "transparent" }}
                      />
                    </TouchableHighlight>
                  }
                  keyboardAppearance="light"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={this.state.securePassword}
                  blurOnSubmit={true}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder={"Password"}
                  onChangeText={(password) => this.setState({password})}
                  value={this.state.password}
                />
              </View>
              <Button
                buttonStyle={{
                  borderRadius: 5,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                  marginTop: 20,
                  flexDirection: "row"
                }}
                title="Login"
                onPress={this._signinAsync}
              />
            </Card>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }

  _signinAsync = async () => {
    const email: string = this.state.email;
    const password: string = this.state.password;
    if (email === "" || password === "") {
      Alert.alert("Gagal", "Email atau Password yang anda masukkan salah.");
    } else {
      this.props.login(email, password);
      this.props.navigation.navigate("App");
    }
  };
}

export default { SigninComponent };