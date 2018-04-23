import React, { Component } from "react";
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableWithoutFeedback,

  Alert,
  AsyncStorage,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

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
    const iconSecretClassName: string = this.state.securePassword ? 'ios-eye-off-outline' : 'ios-eye-outline';
    return (
      <View style={styles.container}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <KeyboardAvoidingView style={styles.loginContainer} behavior="position">
            <View
              style={styles.formContainer}
            >
              <View style={styles.loginHeaderContainer}>
                <Text style={styles.loginHeaderText}>Login</Text>
              </View>
              <View style={styles.fieldContainer}>
                <View style={styles.inputEmailContainer}>
                  <TextInput
                    keyboardAppearance="light"
                    autoFocus={false}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    returnKeyType="next"
                    style={styles.inputTextStyle}
                    placeholder="Email Bhinneka"
                    onChangeText={email => this.setState({ email })}
                    value={this.state.email}
                  />
                </View>
                <View style={styles.inputPasswordContainer}>
                  <TextInput
                    keyboardAppearance="light"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={this.state.securePassword}
                    blurOnSubmit={true}
                    style={styles.inputTextStyle}
                    placeholder="Password"
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password}
                  />
                  <TouchableWithoutFeedback
                    onPress={() => this.toggleShowPassword(this.state.securePassword)}
                  >
                    <View style={styles.buttonSecret}>
                      <Ionicons
                        name={iconSecretClassName}
                        color="rgba(0, 0, 0, 0.38)"
                        size={25}
                        style={styles.iconSecretStyle}
                      />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              <TouchableWithoutFeedback
                style={{
                  
                }}
                onPress={this._signinAsync}
              >
                <View style={styles.buttonLoginContainer}>
                  <Text style={styles.buttonLoginText}>LOGIN</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
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
      await this.props.login(email, password);
      const accessToken = AsyncStorage.getItem('@KeyAccessToken');
      if (accessToken !== null) {
        this.props.navigation.navigate('Home');
      }
    }
  };
}

export default { SigninComponent };