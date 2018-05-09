import { StyleSheet } from 'react-native';
import config from '../../config';

export const styles = StyleSheet.create({
  container: {
    marginTop: -16,
    flex: 1
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
    color: config.color.blue,
    width: 230
  },
  buttonBottomContainer: {
    justifyContent: 'center',
    padding: 16,
    paddingBottom: 0,
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
