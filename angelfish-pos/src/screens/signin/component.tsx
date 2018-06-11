import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  TouchableWithoutFeedback,
  Alert,
  AsyncStorage,
  Image,
} from 'react-native';
import styles from './styles';
import { fetchDataLogin } from '../../helpers/fetch-data';

const BG_IMAGE = require('../../../assets/images/ilLoginGetAccess.png');

export class SigninComponent extends Component<any, any> {
  static navigationOptions = {
    header: null,
  };
  constructor(props: any) {
    super(props);
    this.state = {
      email: '',
      password: '',
      securePassword: true,
      buttonLoginDisabled: true,
    };
  }
  toggleShowPassword(value) {
    this.setState({ password: this.state.password + ' ' });
    setTimeout(() => {
      this.setState({
        password: this.state.password.substring(0, this.state.password.length - 1),
      });
      this.setState({ securePassword: !value });
    }, 100);
  }
  render() {
    const iconShowHidePassword: string = this.state.securePassword
      ? require('./assets/off.png')
      : require('./assets/on.png');
    const buttonLoginContainer = this.state.buttonLoginDisabled
      ? styles.buttonLoginContainerDisabled
      : styles.buttonLoginContainer;
    const buttonLoginText = this.state.buttonLoginDisabled
      ? styles.buttonLoginTextDisabled
      : styles.buttonLoginText;
    return (
      <View style={styles.container}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <KeyboardAvoidingView style={styles.loginContainer} behavior="position" enabled>
            <View style={styles.formContainer}>
              <View style={styles.loginHeaderContainer}>
                <Text style={styles.loginHeaderText}>Login</Text>
              </View>
              <View style={styles.fieldContainer}>
                <View style={styles.inputEmailContainer}>
                  <TextInput
                    keyboardAppearance="light"
                    autoFocus={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    keyboardType="email-address"
                    returnKeyType="next"
                    style={styles.inputTextStyle}
                    placeholder="Email Bhinneka"
                    onChangeText={email => {
                      const { password } = this.state;
                      const buttonLoginDisabled = email !== '' && password !== '' ? false : true;
                      this.setState({ email, buttonLoginDisabled });
                    }}
                    value={this.state.email}
                    onSubmitEditing={() => {
                      this.passwordTextInput.focus();
                    }}
                  />
                </View>
                <View style={styles.inputPasswordContainer}>
                  <TextInput
                    ref={input => {
                      this.passwordTextInput = input;
                    }}
                    keyboardAppearance="light"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={this.state.securePassword}
                    blurOnSubmit={true}
                    style={styles.inputTextStyle}
                    placeholder="Password"
                    onChangeText={password => {
                      const { email } = this.state;
                      const buttonLoginDisabled = email !== '' && password !== '' ? false : true;
                      this.setState({ password, buttonLoginDisabled });
                    }}
                    value={this.state.password}
                    onSubmitEditing={this._signinAsync}
                    returnKeyType="go"
                  />
                  <TouchableWithoutFeedback
                    onPress={() => this.toggleShowPassword(this.state.securePassword)}
                  >
                    <View style={styles.buttonSecret}>
                      <Image source={iconShowHidePassword} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </View>
              <TouchableWithoutFeedback
                disabled={this.state.buttonLoginDisabled}
                onPress={this._signinAsync}
              >
                <View style={buttonLoginContainer}>
                  <Text style={buttonLoginText}>Login</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }

  _signinAsync = async () => {
    if (!this.state.buttonLoginDisabled) {
      const email: string = this.state.email;
      const password: string = this.state.password;
      try {
        await fetchDataLogin(email, password);
        let accessToken = AsyncStorage.getItem('@KeyAccessToken');
        if (accessToken !== null) {
          this.props.navigation.navigate('Home');
        } else {
          Alert.alert('Gagal', 'Email atau password yang Anda masukan salah', [{ text: 'Tutup' }]);
        }
      } catch (err) {
        Alert.alert('Gagal', 'Email atau password yang Anda masukan salah', [{ text: 'Tutup' }]);
      }
    }
  };
}

export default { SigninComponent };
