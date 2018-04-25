import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  ImageBackground,
  NetInfo
} from 'react-native';
import { Button, Card, Icon, Input } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import store from '../store/store';
import { isOffline } from '../helpers/check-connection';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BG_IMAGE = require('../../assets/images/ilLoginGetAccess.png');
export default class Welcome extends React.Component<any, any> {
  static navigationOptions = {
    header: null
  };
  constructor(props: any) {
    super(props);
    this.state = {
      text: '',
      password: ''
    };
  }
  componentWillMount() {
    isOffline(this.props.navigation);
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
                flexDirection: 'row'
              }}
              titleStyle={{ fontWeight: 'bold', fontSize: 18 }}
              title="LOGIN"
              onPress={this._signinAsync}
            />
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
  }

  _signinAsync = async () => {
    this.props.navigation.navigate('Auth');
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
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  formContainer: {
    // width: SCREEN_WIDTH - 30,
    borderRadius: 10,
    paddingTop: 32,
    paddingBottom: 32,
    alignItems: 'center'
  }
});
