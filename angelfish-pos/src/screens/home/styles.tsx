import Expo from "expo";
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingTop: Expo.Constants.statusBarHeight,
    backgroundColor: "#fff",
  },
  containerColumn: {
    flex: 1,
    flexDirection: "row"
  },
  leftPart: {
    flex: 4,
  },
  rightPart: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: "space-between",
  },
  titleRight: {
    paddingTop: 16,
    paddingBottom: 31,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  titleRightText: {
    fontSize: 17,
    color: "rgb(0, 0, 0)",
  },
  contentContainer: {
    paddingTop: 10,
  },
  itemContainer: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
  },
  itemBox: {
    backgroundColor: 'rgb(236, 236, 236)',
    flex: 1,
    padding: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchResultListItemContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  searchResultListItemLeft: {
    flex: 2,
  },
  searchResultImage: {
    width: 85,
    height: 100,
  },
  searchResultListItemRight: {
    flex: 9,
    paddingTop: 10,
    paddingBottom: 10,
  },
  searchResultText: {
    fontSize: 16,
  },
  searchResultPriceDiscountText: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    paddingRight: 5,
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
});

export default styles;