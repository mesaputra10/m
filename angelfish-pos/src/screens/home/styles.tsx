import Expo from 'expo';
import { StyleSheet, Dimensions } from 'react-native';
import config from '../../config';

const heightScreen = Dimensions.get('window').height - 64;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  headerStyle: {
    backgroundColor: '#fff',
    borderBottomWidth: 0,
    paddingTop: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    paddingBottom: 10,
  },
  headerStyleCustom: {
    paddingTop: 32,
    paddingHorizontal: 8,
    flexDirection: 'row',
  },
  headerColLeft: {
    marginRight: 13,
  },
  searchContainer: {
    borderRadius: 5,
    backgroundColor: 'rgba(127, 130, 141, 0.1)',
  },
  buttonClearSearch: {
    justifyContent: 'center',
    marginTop: -6,
  },
  headerColRight: {
    borderLeftWidth: 1,
    borderLeftColor: 'grey',
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
  headerRightContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerRightFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerRightText: {
    fontWeight: 'bold',
    paddingTop: 16,
  },
  contentColLeft: {
    backgroundColor: config.color.white,
    height: heightScreen,
  },
  contentColRight: {
    backgroundColor: '#fff',
    height: heightScreen,
    borderLeftWidth: 1,
    borderLeftColor: config.color.border,
  },
  contentColRightContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contentContainer: {
    paddingTop: 10,
  },
  searchResultText: {
    fontSize: 16,
  },
  searchResultPriceDiscountText: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    paddingRight: 5,
    color: config.color.grey,
  },
  searchResultPriceContainer: {
    flexDirection: 'row',
    paddingTop: 15,
  },
  searchResultDiscountText: {
    fontSize: 16,
    color: 'red',
  },
  searchResultEmptyStockText: {
    fontSize: 16,
    color: 'red',
    paddingTop: 16,
  },
  productItemContainer: {
    backgroundColor: config.color.white,
    flex: 1,
    padding: 8,
  },
  productItemBox: {
    backgroundColor: config.color.white,
    flex: 1,
    padding: 12.5,
  },
  productItemImage: {
    width: '100%',
    height: 170,
  },
  productItemPriceContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingBottom: 16,
  },
  productItemName: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.87)',
  },
  iconCancel: {
    alignItems: 'center',
    marginTop: -2,
    marginRight: 8,
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
  filterCancelText: {
    justifyContent: 'center',
    paddingTop: 16,
    color: config.color.blue,
  },
  filterDeleteText: {
    justifyContent: 'center',
    paddingTop: 16,
    color: config.color.blue,
  },
  searchCancelText: {
    color: config.color.blue,
    fontSize: 17,
  },
  removeButtonContainer: {
    marginRight: -7,
  },
  headerCategoryContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  backCategory: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backCategoryText: {
    color: config.color.blue,
    fontSize: 17,
    marginLeft: -8,
  },
  titleCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 8,
  },
  buttonBackCategoryContainer: {
    justifyContent: 'flex-start',
    flex: 2,
  },
  titleCategory: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleCategoryName: {
    justifyContent: 'center',
    fontSize: 17,
    fontWeight: '600',
  },

  /// newstyle
  leftColumn: {
    justifyContent: 'flex-start',
    flex: 7,
    borderRightWidth: 1,
    borderRightColor: config.color.border,
  },
  rightColumn: {
    justifyContent: 'flex-end',
    flex: 3,
  },
});

export default styles;
