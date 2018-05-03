import { StyleSheet, Dimensions } from 'react-native';
import config from '../../config';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 32,
    width: 400,
    height: 313,
    borderRadius: 12,
    backgroundColor: config.color.white
  },
  fieldContainer: {
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: config.color.border,
    borderRadius: 5
  },
  loginHeaderContainer: {
    paddingBottom: 32
  },
  loginHeaderText: {
    fontSize: 20,
    fontWeight: '600'
  },
  inputTextStyle: {
    marginLeft: 10,
    padding: 16,
    width: '85%',
    fontSize: 14,
    color: config.color.text
  },
  inputEmailContainer: {
    height: 52,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: config.color.border
  },
  inputPasswordContainer: {
    height: 52,
    width: '100%',
    flexDirection: 'row'
  },
  buttonSecret: {
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },
  iconSecretStyle: {
    backgroundColor: 'transparent'
  },
  buttonLoginContainer: {
    borderRadius: 5,
    marginTop: 24,
    flexDirection: 'row',
    height: 56,
    width: 336,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: config.color.blue
  },
  buttonLoginContainerDisabled: {
    borderRadius: 5,
    marginTop: 24,
    flexDirection: 'row',
    height: 56,
    width: 336,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: config.color.buttonGrey
  },
  buttonLoginText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  buttonLoginTextDisabled: {
    fontSize: 18,
    fontWeight: 'bold',
    color: config.color.textGrey
  }
});

export default styles;
