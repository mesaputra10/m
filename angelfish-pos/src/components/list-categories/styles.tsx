import { StyleSheet } from 'react-native';
import config from '../../config';
export const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 16
  },
  itemBox: {
    backgroundColor: 'rgb(236, 236, 236)',
    flex: 1,
    padding: 12.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listContainerCategory: {
    borderBottomWidth: 0.5,
    borderColor: config.color.border,
    padding: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 56
  },
  listLeftCategory: {
    flexDirection: 'column',
    flex: 8
  },
  listRightCategory: {
    alignItems: 'flex-end',
    paddingRight: 16
  },
  titleListTextCategory: {
    fontSize: 16,
    width: '80%',
    alignItems: 'flex-end'
  },
  circleStyle: {
    flex: 1
  },
  plusMinus: {
    fontSize: 16,
    alignItems: 'center',
    paddingRight: 8,
    marginTop: 3
  }
});
export default styles;
