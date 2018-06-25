import { StyleSheet, Dimensions } from 'react-native';
import config from '../../config';

//grid
const widthLeftSide = 0.7; // 70%
const widthDevice = Dimensions.get('window').width * widthLeftSide;
const heightDevice = Dimensions.get('window').height - 56;
const column = 4;
const padding = 16;
const totalPadding = padding * (column * 2);
const cardBoxWidth = (widthDevice - totalPadding) / column;

export const styles = StyleSheet.create({
  container: {
    height: heightDevice
  },
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
  },

  //grid
  elementContainer: {
    backgroundColor: config.color.white,
    padding: 16
  },
  elementContent: {
    height: 145,
    width: cardBoxWidth - 1,
    backgroundColor: 'rgb(236, 236, 236)',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default styles;