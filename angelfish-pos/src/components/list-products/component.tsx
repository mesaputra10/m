import React, { Component } from 'react';
import { Grid } from 'antd-mobile';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  Modal,
  Alert,
  AsyncStorage
} from 'react-native';
import styles from './styles';
import numberFormat from '../../helpers/number-format';
import { NavigationScreenProps } from 'react-navigation';
import { ProductsNotFound } from '../products-not-found';
import { searchProduct, FilterParams } from '../../helpers/fetch-data';
import { Product } from '../../bmd';
import config from '../../config';
import { uniqBy } from 'lodash';

interface ListProductsComponentProps extends NavigationScreenProps<any, any> {
  products?: Product[];
  keyword?: string;
  totalProducts?: number;
  setFilter?: any;
  showFilter?: boolean;
  searchProduct(keyword, page, filterParams): any;
  isFetching?: boolean;
}

interface ListProductsComponentState {
  loading: boolean;
  fetching: boolean;
  page: number;
  keyword: string;
  products: Product[];
}
export class ListProductsComponent extends Component<
  ListProductsComponentProps,
  ListProductsComponentState
> {
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

  static getDerivedStateFromProps(nextProps, prevState) {
    const { products } = nextProps;
    if (products) {
      return { products };
    }
    return {};
  }

  componentDidMount() {
    setTimeout(
      () =>
        this.setState({
          loading: false
        }),
      500
    );
  }
  addProductToProductSearchHistories = async product => {
    if (product === '' || product === '{}') return null;

    const key = config.key.historyProductVisited;
    const historiesString: any = await AsyncStorage.getItem(key);
    const dataHistories = historiesString !== null ? JSON.parse(historiesString) : [];
    let histories = dataHistories.length > 0 ? dataHistories.slice(0) : [];

    if (histories.length >= 10) histories.shift();
    histories.push(product);
    histories.map((h, i) => {
      if (h.sku === product.sku) {
        histories.splice(i, 2, histories[histories.length - 1], histories[i]);
      }
    });
    histories = uniqBy(histories, 'sku');

    const historiesJsonToString = JSON.stringify(histories);
    await AsyncStorage.setItem(key, historiesJsonToString);
  };
  _renderProductItem = (product, index) => {
    const productImage =
      product.variantImageThumbnail !== ''
        ? { uri: product.variantImageThumbnail }
        : require('./assets/icGreyNoImage.png');
    return (
      <View style={styles.productItemContainer}>
        <TouchableWithoutFeedback
          onLongPress={() => Alert.alert('Should show modal summary of product')}
          onPress={() => {
            const passProps = {
              title: product.productName,
              sku: product.variantSkuNo,
              productImage: product.variantImageThumbnail
            };
            this.addProductToProductSearchHistories(passProps);
            this.props.navigation.navigate('PageProductDetail', passProps);
          }}
        >
          <View style={styles.productItemBox}>
            <Image source={productImage} style={styles.productItemImage} />
            <View style={styles.productItemPriceContainer}>
              <Text numberOfLines={2} style={styles.productItemName}>
                {product.productName}
              </Text>
              {product.isDiscount > 0 && (
                <View style={[styles.searchResultPriceContainer, { paddingTop: 8 }]}>
                  {product.variantPrice !== product.offerNormalPrice && (
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
                <Text style={styles.searchResultText}>Rp {numberFormat(product.variantPrice)}</Text>
              )}
              {product.isOutofStock && (
                <Text style={styles.searchResultEmptyStockText}>Stok Habis</Text>
              )}
            </View>
            <View style={styles.buttonBeliContainer}>
              <Text style={styles.buttonBeliText}>BELI</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.productBorderBottom} />
      </View>
    );
  };
  fetchProducts = async () => {
    const keyword = this.state.keyword;
    const page = this.state.page;
    let data = await searchProduct(keyword, page + 1);
    let nextproducts = Product.fromPlain(data.hits);
    this.setState({
      fetching: false,
      products: this.state.products.concat(nextproducts),
      page: page + 1
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
    const { navigation, setFilter, showFilter, keyword, totalProducts, isFetching } = this.props;
    if (this.state.loading || isFetching) {
      return (
        <Image
          source={require('./assets/load-structure.png')}
          resizeMode="stretch"
          style={styles.loadStructure}
        />
      );
    }
    if (products.length > 0) {
      return (
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1000}
          onScroll={event => {
            if (this.state.loading) {
              return;
            }
            const offset = event.nativeEvent.contentOffset.y;
            const height =
              event.nativeEvent.contentSize.height - event.nativeEvent.layoutMeasurement.height;

            if (offset >= height) {
              if (this.state.fetching === false) {
                this.loadMore();
              }
            }
          }}
          style={styles.scrollContainer}
        >
          <View style={styles.container}>
            <View>
              <Text style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.38)' }}>
                {numberFormat(totalProducts)} Produk
              </Text>
            </View>
            <View>
              <TouchableWithoutFeedback
                onPress={() => setFilter(!showFilter)}
                disabled={showFilter}
              >
                <View style={styles.filterContainer}>
                  <Image source={require('./assets/filter.png')} />
                  <Text style={styles.filterText}>Filter</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <Grid
            data={products}
            itemStyle={{
              width: 168,
              height: 350
            }}
            onClick={(product, i) => {
              const passProps = { title: product.productName, sku: product.variantSkuNo };
              navigation.navigate('PageProductDetail', passProps);
            }}
            renderItem={(el, i) => this._renderProductItem(el, i)}
            hasLine={false}
            columnNum={3}
          />
        </ScrollView>
      );
    } else {
      return <ProductsNotFound keyword={keyword} />;
    }
  }
}
export default ListProductsComponent;
