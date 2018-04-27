import React, { Component } from 'react';
import { Grid } from 'antd-mobile';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView } from 'react-native';
import styles from './styles';
import numberFormat from '../../helpers/number-format';
import { NavigationScreenProps } from 'react-navigation';
import { DataItem } from 'antd-mobile/lib/grid/PropsType';
import { ProductsNotFound } from '../products-not-found';

interface Product extends DataItem {
  productId: string;
  productName: string;
  offerNormalPrice: number;
  offerSpecialPrice: number;
  variantPrice: number;
  variantSkuNo: string;
  variantImageThumbnail: string;
}
interface ListProductsComponentProps extends NavigationScreenProps<any, any> {
  products: Product[];
  keyword: string;
}
export class ListProductsComponent extends Component<ListProductsComponentProps, any> {
  constructor(props) {
    super(props);
  }
  _renderProductItem = (product, index) => {
    const productImage =
      product.variantImageThumbnail !== ''
        ? { uri: product.variantImageThumbnail }
        : require('./assets/icGreyNoImage.png');
    return (
      <View style={styles.productItemContainer}>
        <View style={styles.productItemBox}>
          <Image source={productImage} style={styles.productItemImage} />
          <View style={styles.productItemPriceContainer}>
            <Text numberOfLines={2} style={styles.productItemName}>
              {product.productName}
            </Text>
            {product.variantPrice > 0 && (
              <View style={[styles.searchResultPriceContainer, { paddingTop: 4 }]}>
                {product.variantPrice !== product.offerNormalPrice && (
                  <Text style={styles.searchResultPriceDiscountText}>
                    Rp {numberFormat(product.offerNormalPrice)}
                  </Text>
                )}
              </View>
            )}
            {product.variantPrice > 0 &&
              product.variantPrice !== product.offerNormalPrice && (
                <Text style={styles.searchResultText}>
                  Rp {numberFormat(product.offerSpecialPrice)}
                </Text>
              )}
            {product.variantPrice === product.offerNormalPrice && (
              <Text style={styles.searchResultText}>Rp {numberFormat(product.variantPrice)}</Text>
            )}
            {product.variantPrice === 0 && (
              <Text style={styles.searchResultEmptyStockText}>Stok Habis</Text>
            )}
          </View>
          <TouchableWithoutFeedback
            onPress={() => {
              const passProps = { title: product.productName, sku: product.variantSkuNo };
              this.props.navigation.navigate('PageProductDetail', passProps);
            }}
          >
            <View style={styles.buttonBeliContainer}>
              <Text style={styles.buttonBeliText}>BELI</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  };

  render() {
    const { products } = this.props;
    if (products.length > 0) {
      return (
        <ScrollView>
          <Grid
            data={this.props.products}
            itemStyle={{
              width: 168,
              height: 350
            }}
            onClick={(product, i) => {
              const passProps = { title: product.productName, sku: product.variantSkuNo };
              this.props.navigation.navigate('PageProductDetail', passProps);
            }}
            renderItem={(el, i) => this._renderProductItem(el, i)}
            hasLine={false}
            columnNum={3}
          />
        </ScrollView>
      );
    } else {
      return (
        <View style={{ flex: 1 }}>
          <ProductsNotFound keyword={this.props.keyword} />
        </View>
      );
    }
  }
}
