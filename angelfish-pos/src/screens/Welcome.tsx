import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  ImageBackground,
  TouchableWithoutFeedback
} from 'react-native';
import config from '../config';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BG_IMAGE = require('../../assets/images/ilLoginGetAccess.png');

export class Welcome extends React.Component<any, any> {
  static navigationOptions = {
    header: null
  };
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={BG_IMAGE} style={styles.bgImage}>
          <TouchableWithoutFeedback onPress={this._signinAsync}>
            <View style={styles.buttonLoginContainer}>
              <Text style={styles.loginText}>LOGIN</Text>
            </View>
          </TouchableWithoutFeedback>
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
  buttonLoginContainer: {
    borderRadius: 5,
    marginTop: 270,
    width: 336,
    height: 56,
    backgroundColor: config.color.blue,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: config.color.white
  }
});
export default Welcome;
