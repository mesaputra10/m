import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
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
  loadStructure: {
    width: '100%',
    height: '80%'
  }
});
export default styles;
