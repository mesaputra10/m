import { StyleSheet, Dimensions } from 'react-native';
import config from '../../config';

const heightDevice = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: 16,
    height: heightDevice - 56
  },
  container: {
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  searchResultText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  searchResultPriceDiscountText: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    paddingRight: 5,
    color: config.color.textGrey
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
    backgroundColor: config.color.white,
    flex: 1
  },
  productItemBox: {
    backgroundColor: config.color.white,
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingTop: 8,
    justifyContent: 'space-between'
  },
  productItemImage: {
    width: '100%',
    height: 170
  },
  productItemPriceContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 8
  },
  productItemName: {
    fontSize: 16,
    textAlign: 'left',
    color: config.color.text,
    paddingBottom: 8
  },
  buttonBeliContainer: {
    height: 40,
    borderRadius: 3,
    backgroundColor: config.color.yellow,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonBeliText: {
    color: config.color.text,
    fontWeight: 'bold'
  },
  loadStructure: {
    width: '100%',
    height: '80%'
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  filterText: {
    fontSize: 14,
    color: config.color.text
  },
  productBorderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: config.color.border,
    paddingVertical: 8
  }
});
export default styles;
