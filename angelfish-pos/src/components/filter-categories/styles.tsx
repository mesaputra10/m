import { StyleSheet } from 'react-native';
import config from '../../config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    height: 64,
    justifyContent: 'space-between'
  },
  contentContainer: {
    flex: 1
  },
  listContainer: {
    borderBottomWidth: 0.5,
    borderColor: config.color.border,
    padding: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center'
  },
  brandContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleListText: {
    fontSize: 16,
    paddingBottom: 4,
    paddingLeft: 16,
    alignItems: 'center',
    marginTop: 5
  },
  buttonBottomContainer: {
    justifyContent: 'center',
    padding: 16,
    alignItems: 'flex-end',
    backgroundColor: config.color.backgroundGrey
  },
  buttonBottomStyle: {
    width: 275,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: config.color.blue,
    borderRadius: 5
  },
  buttonBottomText: {
    color: config.color.white,
    fontWeight: 'bold',
    fontSize: 18,
    padding: 10
  },
  rightColumnTop: {
    justifyContent: 'flex-start'
  },
  rightColumnContainer: {
    flex: 1,
    paddingTop: 15,
    height: 64,
    justifyContent: 'space-between'
  },
  headerRightFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  headerRightText: {
    fontWeight: 'bold',
    paddingTop: 17
  },
  removeButtonContainer: {
    marginRight: -7
  },
  filterCancelText: {
    justifyContent: 'center',
    fontSize: 17,
    paddingTop: 15,
    color: config.color.blue
  },
  filterDeleteText: {
    justifyContent: 'center',
    paddingTop: 15,
    fontSize: 17,
    color: config.color.blue
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
    flex: 1
  },
  titleListTextCategory: {
    fontSize: 14,
    width: '80%'
  },
  categoryCount: {
    fontSize: 14,
    justifyContent: 'center'
  },
  circleStyle: {
    flex: 1
  }
});
export default styles;
