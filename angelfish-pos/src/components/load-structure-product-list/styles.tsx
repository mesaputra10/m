import { StyleSheet, Dimensions } from 'react-native';
import config from '../../config';

const leftColumn = Dimensions.get('window').width * 0.7;
const widthItem = (leftColumn - 48) / 3 - 23;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.color.white,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    marginTop: 8,
  },
  itemContainer: {
    width: widthItem,
    backgroundColor: config.color.white,
    marginHorizontal: 16,
    height: 350,
  },
  imageBlock: {
    width: widthItem,
    height: 150,
    backgroundColor: config.color.greySmooth,
  },
  title: {
    marginTop: 16,
    width: widthItem,
    height: 15,
    backgroundColor: config.color.greySmooth,
  },
  title2: {
    marginTop: 4,
    width: widthItem - 41,
    height: 15,
    backgroundColor: config.color.greySmooth,
  },
  title3: {
    marginTop: 16,
    width: widthItem - 41,
    height: 15,
    backgroundColor: config.color.greySmooth,
  },
  title4: {
    marginTop: 4,
    width: widthItem - 97,
    height: 15,
    backgroundColor: config.color.greySmooth,
  },
  button: {
    marginTop: 16,
    width: widthItem,
    height: 40,
    backgroundColor: config.color.yellow,
  },
});

export default styles;
