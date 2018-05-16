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
  circleStyle: {
    width: 24,
    height: 24,
    borderRadius: 25,
    borderWidth: 1
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
    marginRight: -7,
    alignItems: 'baseline'
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
  searchBrandContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    paddingVertical: 8
  },
  searchBrandWrap: {
    flex: 10,
    height: 30,
    backgroundColor: '#f0f0f1',
    borderRadius: 5,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center'
  },
  iconSearch: {
    fontSize: 16
  },
  searchInputText: {
    color: config.color.text,
    fontSize: 16,
    paddingLeft: 8,
    width: 170
  },
  searchBrandBatalContainer: {
    flex: 2,
    flexDirection: 'row',
    paddingLeft: 16
  },
  buttonBatalSearch: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  batalSearchText: {
    color: config.color.blue,
    fontSize: 17
  },
  iconCancel: {
    alignItems: 'center',
    marginTop: -2,
    marginRight: 8
  },
  buttonClearSearch: {
    alignItems: 'center'
  },
  searchStyle: {
    width: 20,
    height: 20,
    marginBottom: -15
  },
  removeButtonRight: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});
export default styles;
