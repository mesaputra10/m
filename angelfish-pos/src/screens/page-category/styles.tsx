import { StyleSheet } from 'react-native';
import config from '../../config';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff'
  },
  leftColumn: {
    flex: 7,
    borderRightWidth: 1,
    borderRightColor: config.color.border
  },
  rightColumn: {
    flex: 3
  }
});

export default styles;
