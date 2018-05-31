import { StyleSheet } from 'react-native';
import config from '../../config';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16
  },
  searchResultListItemContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: config.color.border
  },
  searchResultListItemLeft: {
    flex: 2
  },
  searchResultImage: {
    width: 85,
    height: 100
  },
  searchResultListItemRight: {
    flex: 9,
    paddingTop: 10,
    paddingBottom: 10
  },
  titleProduct: {
    fontSize: 16
  },
  searchResultText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  searchResultPriceDiscountText: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    paddingRight: 5,
    color: config.color.grey
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
  }
});

export default styles;
