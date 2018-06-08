import { StyleSheet } from 'react-native';
import config from '../../config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    height: 64,
    justifyContent: 'space-between',
  },
  headerRightContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightColumnTop: {
    justifyContent: 'flex-start',
  },
  rightColumnContainer: {
    flex: 1,
    paddingTop: 15,
    height: 64,
    justifyContent: 'space-between',
  },
  headerRightFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerRightText: {
    fontWeight: 'bold',
    paddingTop: 15,
    fontSize: 17,
  },
  removeButtonContainer: {
    marginRight: -7,
  },
  filterCancelText: {
    justifyContent: 'center',
    fontSize: 17,
    paddingTop: 15,
    color: config.color.blue,
  },
  filterDeleteText: {
    justifyContent: 'center',
    paddingTop: 15,
    fontSize: 17,
    color: config.color.blue,
  },
  buttonBottomContainer: {
    justifyContent: 'center',
    padding: 16,
    alignItems: 'flex-end',
    backgroundColor: config.color.backgroundGrey,
  },
  buttonBottomStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: config.color.blue,
    borderRadius: 5,
  },
  buttonBottomText: {
    color: config.color.white,
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10,
  },
});
