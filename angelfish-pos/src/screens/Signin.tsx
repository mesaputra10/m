import * as React from "react";
import {StyleSheet, Text, View, AsyncStorage, TextInput, KeyboardAvoidingView, Dimensions,ImageBackground} from "react-native";
import {Button, Card, Icon, Input,} from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BG_IMAGE = require('../../assets/images/ilLoginGetAccess.png')
export default class Signin extends React.Component<any, any> {
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
          <KeyboardAvoidingView style={styles.loginContainer} behavior='position'>
              <Card title="Login" wrapperStyle={{width:400}} containerStyle={styles.formContainer} dividerStyle={{display:'none'}}>

                  <View style={{alignItems:'center'}}>
                  <Input

                      // value={email}
                      keyboardAppearance='light'
                      autoFocus={false}
                      autoCapitalize='none'
                      autoCorrect={false}
                      keyboardType='email-address'
                      returnKeyType='next'
                      inputStyle={{marginLeft: 10}}
                      placeholder={'Email Bhinneka'}
                      containerStyle={{borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                      // ref={input => this.emailInput = input}
                      // onSubmitEditing={() => this.passwordInput.focus()}
                      // onChangeText={email => this.setState({ email })}
                      // errorMessage={isEmailValid ? null : 'Please enter a valid email address'}
                  />
                  <Input
                      rightIcon={
                          <Ionicons
                              name='ios-eye-off-outline'
                              color='rgba(0, 0, 0, 0.38)'
                              size={25}
                              style={{backgroundColor: 'transparent'}}
                          />
                      }
                      // value={password}
                      keyboardAppearance='light'
                      autoCapitalize='none'
                      autoCorrect={false}
                      secureTextEntry={true}
                      // returnKeyType={isSignUpPage ? 'next' : 'done'}
                      blurOnSubmit={true}
                      // containerStyle={{marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)'}}
                      inputStyle={{marginLeft: 10}}
                      placeholder={'Password'}
                      // ref={input => this.passwordInput = input}
                      // onSubmitEditing={() => isSignUpPage ? this.confirmationInput.focus() : this.login()}
                      // onChangeText={(password) => this.setState({password})}
                      // errorMessage={isPasswordValid ? null : 'Please enter at least 8 characters'}
                  /></View>
                  <Button
                      // icon={{name: 'code'}}
                      // backgroundColor='#03A9F4'
                      // fontFamily='Lato'
                      buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0, marginTop:20, flexDirection:'row'}}
                      title='Login'
                  onPress={this._signinAsync}/>
              </Card>
          </KeyboardAvoidingView>
          </ImageBackground>
      </View>
    );
  }

  _signinAsync = async () => {
    await AsyncStorage.setItem("userToken", "abc");
    this.props.navigation.navigate("App");
  };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        top: 0,
        left: 0,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        // width: SCREEN_WIDTH - 30,
        borderRadius: 10,
        paddingTop: 32,
        paddingBottom: 32,
        alignItems:'center',
    },});
