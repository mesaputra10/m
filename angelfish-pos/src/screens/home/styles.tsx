import Expo from 'expo';
import { StyleSheet, Dimensions } from 'react-native';
const heightScreen = Dimensions.get('window').height - 64;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: Expo.Constants.statusBarHeight,
    backgroundColor: '#fff'
  },
  headerStyle: {
    backgroundColor: '#fff',
    borderWidth: 0
  },
  headerColLeft: {
    marginRight: 13
  },
  searchContainer: {
    borderRadius: 5,
    backgroundColor: 'rgba(127, 130, 141, 0.1)'
  },
  buttonClearSearch: {
    justifyContent: 'center',
    marginTop: -6
  },
  headerColRight: {
    borderLeftWidth: 1,
    borderLeftColor: 'grey'
  },
  headerRightContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerRightFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  headerRightText: {
    fontWeight: 'bold',
    paddingTop: 16
  },
  contentColLeft: {
    backgroundColor: '#fff',
    height: heightScreen
  },
  contentColRight: {
    backgroundColor: '#fff',
    height: heightScreen,
    borderLeftWidth: 1,
    borderLeftColor: 'grey'
  },
  contentContainer: {
    paddingTop: 10
  },
  searchResultText: {
    fontSize: 16
  },
  searchResultPriceDiscountText: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    paddingRight: 5,
    color: 'rgba(0, 0, 0, 0.38)'
  },
  searchResultPriceContainer: {
    flexDirection: 'row',
    paddingTop: 15
  },
  searchResultDiscountText: {
    fontSize: 16,
    color: 'red'
  },
  searchResultEmptyStockText: {
    fontSize: 16,
    color: 'red',
    paddingTop: 16
  },
  productItemContainer: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 8
  },
  productItemBox: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 12.5
  },
  productItemImage: {
    width: '100%',
    height: 170
  },
  productItemPriceContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingBottom: 16
  },
  productItemName: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'left',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  buttonBeliContainer: {
    height: 40,
    borderRadius: 3,
    backgroundColor: 'rgb(255, 202, 4)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonBeliText: {
    color: '#000',
    fontWeight: '500',
    fontSize: 16
  },
  iconCancel: {
    alignItems: 'center',
    marginTop: -2,
    marginRight: 8
  }
});

export default styles;
