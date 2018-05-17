import { StyleSheet, Dimensions } from 'react-native';
import config from '../../config';

const heightDevice = Dimensions.get('window').height;
const heightScroll = heightDevice / 2 - 64;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    height: heightScroll
  },
  titleHistoryText: {
    color: config.color.grey,
    fontSize: 17,
    paddingVertical: 16
  },
  historyText: {
    color: config.color.black,
    fontSize: 17,
    paddingVertical: 16
  },
  removeHistoryText: {
    color: config.color.red,
    fontSize: 17,
    paddingVertical: 16
  }
});
export default styles;
