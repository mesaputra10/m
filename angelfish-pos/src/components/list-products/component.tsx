import React, { Component } from 'react';
import { Grid } from 'antd-mobile';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView } from 'react-native';
import styles from './styles';
import numberFormat from '../../helpers/number-format';
import { NavigationScreenProps } from 'react-navigation';
import { DataItem } from 'antd-mobile/lib/grid/PropsType';
import { ProductsNotFound } from '../products-not-found';
import { searchProduct } from '../../helpers/fetch-data';

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
  totalProducts: number;
}
export class ListProductsComponent extends Component<ListProductsComponentProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      fetching: false,
      page: 1,
      keyword: '',
      products: props.products
    };
  }
  componentDidMount() {
    setTimeout(
      () =>
        this.setState({
          loading: false
        }),
      2000
    );
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
  fetchProducts = () => {
    const keyword = this.state.keyword;
    const page = this.state.page;
    return searchProduct(keyword, page + 1).then(data => {
      this.setState({
        fetching: false,
        products: this.state.products.concat(data.hits),
        page: page + 1
      });
    });
  };
  loadMore = () => {
    this.setState({ fetching: true }, () => {
      setTimeout(() => {
        this.fetchProducts();
      }, 500);
    });
  };
  render() {
    const products = this.state.products;
    if (this.state.loading) {
      return (
        <Image
          source={require('./assets/load-structure.png')}
          resizeMode="contain"
          style={styles.loadStructure}
        />
      );
    }
    if (products.length > 0) {
      return (
        <ScrollView
          scrollEventThrottle={1000}
          onScroll={event => {
            if (this.state.loading) {
              return;
            }
            console.log(this.state.fetching, 'fetching');
            const offset = event.nativeEvent.contentOffset.y;
            const height =
              event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height;

            if (offset >= height) {
              if (this.state.fetching === false) {
                this.loadMore();
              }
            }
          }}
        >
          <View style={{ paddingHorizontal: 16, paddingVertical: 10 }}>
            <Text style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.38)' }}>
              {numberFormat(this.props.totalProducts)} Produk
            </Text>
          </View>
          <Grid
            data={products}
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
