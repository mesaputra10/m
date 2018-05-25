import config from '../../config';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: config.color.white
  },
  headerStyleCustom: {
    paddingTop: 32,
    paddingHorizontal: 8,
    flexDirection: 'row'
  },
  headerColLeft: {
    marginRight: 13
  },
  headerCategoryContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 8
  },
  buttonBackCategoryContainer: {
    justifyContent: 'flex-start',
    flex: 2
  },
  backCategory: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  backCategoryText: {
    color: config.color.blue,
    fontSize: 17,
    fontWeight: '600'
  },
  titleCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 8
  },
  titleCategory: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleCategoryName: {
    justifyContent: 'center',
    fontSize: 17,
    fontWeight: '600'
  },
  content: {
    flex: 1,
    padding: 16
  },
  buttonStokHabis: {
    marginTop: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 56,
    borderRadius: 5,
    backgroundColor: 'rgb(189, 189, 189)',
    marginBottom: 8
  },
  textButtonStokHabis: {
    width: 300,
    height: 22,
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 22,
    letterSpacing: 0,
    textAlign: 'center',
    color: 'rgb(151, 151, 152)'
  },
  rowContentContainer: {
    paddingLeft: 32,
    flexDirection: 'column',
    paddingTop: 8
  },
  rowTitleSectionContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  textSectionTitle: {
    width: 303,
    height: 22,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 22,
    letterSpacing: -0.26,
    color: 'rgba(0, 0, 0, 0.87)'
  },
  iconSection: {
    marginRight: 8
  },
  rowSectionContainer: {
    borderBottomWidth: 1,
    borderBottomColor: config.color.border,
    paddingVertical: 16
  },
  rowSectionContainerNoBorder: {
    borderBottomWidth: 0,
    paddingVertical: 16
  },
  contentSection: {
    width: 595,
    height: 40,
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 20,
    letterSpacing: -0.08,
    color: 'rgba(0, 0, 0, 0.87)'
  },
  productImageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32
  },
  productImage: {
    width: 500,
    height: 500
  },
  productTitle: {
    width: 632,
    height: 44,
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(0, 0, 0, 0.87)'
  },
  productCategorySku: {
    borderBottomWidth: 1,
    borderBottomColor: config.color.border,
    paddingTop: 8
  },
  categoryText: {
    paddingTop: 8,
    fontSize: 14,
    color: config.color.blue
  },
  skuText: {
    fontSize: 14,
    alignItems: 'center'
  },
  priceContainer: {
    flex: 1,
    flexDirection: 'row'
  },
  priceBeforeDiscount: {
    width: 97,
    height: 20,
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 20,
    letterSpacing: -0.08,
    color: 'rgba(0, 0, 0, 0.38)',
    textDecorationLine: 'line-through'
  },
  discountPrice: {
    width: 35,
    height: 20,
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 20,
    letterSpacing: -0.08,
    color: 'rgb(237, 28, 36)'
  },
  finalPrice: {
    width: 174,
    height: 28,
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 28,
    letterSpacing: 0.35,
    color: 'rgb(237, 28, 36)'
  },
  skuRating: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 16
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  cicilanText: {
    width: 303,
    height: 22,
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 22,
    letterSpacing: -0.26,
    color: 'rgba(0, 0, 0, 0.87)'
  },
  bold: {
    fontWeight: 'bold'
  },
  // start dropdown
  dropdownContainer: {
    width: 230,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgb(255, 255, 255)',
    borderWidth: 1,
    borderColor: 'rgb(193, 195, 201)',
    flexDirection: 'row',
    alignItems: 'center'
  },
  dropdownTextContainer: {
    flex: 9,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  dropdownText: {
    fontSize: 14,
    color: config.color.text,
    marginRight: 12
  },
  dropdownIconContainer: {
    flex: 1,
    alignItems: 'center'
  },
  dropdownIcon: {
    marginRight: 16
  },
  // end dropdown
  dropdownTime: {
    marginLeft: 8,
    width: 90,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'rgb(255, 255, 255)',
    borderWidth: 1,
    borderColor: 'rgb(193, 195, 201)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default styles;
