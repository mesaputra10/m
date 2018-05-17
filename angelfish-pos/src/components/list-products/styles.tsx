import { StyleSheet, Dimensions } from 'react-native';
import config from '../../config';

const heightDevice = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  searchResultText: {
    fontSize: 16
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
    flex: 1,
    marginLeft: -6,
    marginRight: -6
  },
  productItemBox: {
    backgroundColor: config.color.white,
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 8
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
    fontWeight: 'bold',
    fontSize: 16
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
  }
});
export default styles;
