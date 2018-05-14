import { StyleSheet } from 'react-native';
import config from '../../config';

const styles = StyleSheet.create({
  container: {
    height: '90%',
    flexDirection: 'column',
    backgroundColor: config.color.white,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    paddingBottom: 24
  },
  titleText: {
    fontSize: 20,
    fontWeight: '600',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 8
  },
  contentText: {
    width: 263,
    textAlign: 'center',
    fontSize: 16
  },
  buttonContainer: {
    paddingTop: 24
  },
  buttonSectionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 128,
    height: 40,
    borderRadius: 5,
    backgroundColor: config.color.blue
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    color: config.color.white
  }
});
export default styles;
