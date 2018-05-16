import React, { Component } from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { ScrollView, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import generateUniqKey from '../../helpers/generate-uniq-key';
import numberFormat from '../../helpers/number-format';
import { DataItem } from 'antd-mobile/lib/grid/PropsType';
import { styles } from './styles';
import { Product } from '../../bmd';

interface SearchResultListComponentProps extends NavigationScreenProps<any, any> {
  products: Product[];
  maxItem: number;
}

export class SearchResultListComponent extends Component<SearchResultListComponentProps, any> {
  constructor(props) {
    super(props);
  }
  render() {
    const { products, maxItem, navigation } = this.props;
    return (
      <ScrollView keyboardShouldPersistTaps="always">
        <View style={styles.container}>
          {products.length > 0 &&
            products.slice(0, maxItem).map((product, index) => {
              const productImage =
                product.variantImageThumbnail !== ''
                  ? { uri: product.variantImageThumbnail }
                  : require('./assets/icGreyNoImage.png');
              const noBorderBottom = index + 1 === maxItem ? { borderBottomWidth: 0 } : null;
              return (
                <TouchableWithoutFeedback
                  onPress={() => {
                    const passProps = {
                      title: product.productName,
                      sku: product.variantSkuNo
                    };
                    navigation.navigate('PageProductDetail', passProps);
                  }}
                  key={generateUniqKey(index)}
                >
                  <View style={[styles.searchResultListItemContainer, noBorderBottom]}>
                    <View style={styles.searchResultListItemLeft}>
                      <Image source={productImage} style={styles.searchResultImage} />
                    </View>
                    <View style={styles.searchResultListItemRight}>
                      <Text style={styles.searchResultText}>{product.productName}</Text>
                      {product.isDiscount && (
                        <View style={styles.searchResultPriceContainer}>
                          {product.isDiscount && (
                            <Text style={styles.searchResultPriceDiscountText}>
                              Rp {numberFormat(product.offerNormalPrice)}
                            </Text>
                          )}
                          {product.offerDiscountPercentage > 0 && (
                            <Text style={styles.searchResultDiscountText}>
                              {' '}
                              -{product.offerDiscountPercentage}%
                            </Text>
                          )}
                        </View>
                      )}
                      {product.isDiscount && (
                        <Text style={styles.searchResultText}>
                          Rp {numberFormat(product.offerSpecialPrice)}
                        </Text>
                      )}
                      {!product.isDiscount && (
                        <Text style={styles.searchResultText}>
                          Rp {numberFormat(product.variantPrice)}
                        </Text>
                      )}
                      {product.isOutofStock && (
                        <Text style={styles.searchResultEmptyStockText}>Stok Habis</Text>
                      )}
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
        </View>
      </ScrollView>
    );
  }
}

export default SearchResultListComponent;
