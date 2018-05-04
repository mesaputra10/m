import { StyleSheet } from 'react-native';
import config from '../../config';

export const styles = StyleSheet.create({
  container: {
    width: 300,
    marginTop: -16
  },
  listContainer: {
    borderBottomWidth: 0.5,
    borderColor: 'grey',
    padding: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  listLeft: {
    flexDirection: 'column'
  },
  listRight: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleListText: {
    fontSize: 16,
    paddingBottom: 4
  },
  titleListSelectedDefault: {
    fontSize: 12
  },
  titleListSelected: {
    color: config.color.blue
  }
});
export default styles;
