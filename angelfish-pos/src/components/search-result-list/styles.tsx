import { StyleSheet } from 'react-native';

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
    borderColor: 'rgb(193, 195, 201)'
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
  }
});

export default styles;
