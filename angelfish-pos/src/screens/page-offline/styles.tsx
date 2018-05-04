import { StyleSheet } from 'react-native';
import config from '../../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: config.color.white
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
