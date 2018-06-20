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
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import styles from './styles';
import numberFormat from '../../helpers/number-format';
import { NavigationScreenProps } from 'react-navigation';
import { ProductsNotFound } from '../products-not-found';
import { searchProduct, FilterParams } from '../../helpers/fetch-data';
import { Product } from '../../bmd';
import config from '../../config';
import { uniqBy } from 'lodash';
import { LoadStructureProductList } from '../load-structure-product-list';

interface ListProductsComponentProps extends NavigationScreenProps<any, any> {
  products?: Product[];
  keyword?: string;
  selectedCategoryId?: string;
  totalProducts?: number;
  setFilter?: any;
  showFilter?: boolean;
  searchProduct(keyword, page, filterParams, sortBy): any;
  isFetching?: boolean;
}

const componentState = {
  loading: true,
  fetching: false,
  page: 1,
  keyword: '',
  products: Array<Product>(),
  showFilterSort: false,
  sortBy: '',
  selectedSortBy: 'Paling Sesuai',
};

export class ListProductsComponent extends Component<
  ListProductsComponentProps,
  typeof componentState
> {
  constructor(props) {
    super(props);
    this.state = componentState;
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
          loading: false,
        }),
      500,
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
    if (!product) return null;

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
              sku: product.variantSkuNo,
              productImage: product.variantImageThumbnail,
              offerId: product.offerId,
              variantId: product.variantId,
            };
            this.addProductToProductSearchHistories(passProps);
            this.props.navigation.navigate('PageProductDetail', passProps);
          }}
        >
          <View style={styles.productItemBox}>
            <Image source={productImage} style={styles.productItemImage} resizeMode="contain" />
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
            {product.variantStatus === 'published' &&
              product.offerStatus === 'active' &&
              product.variantPrice > 0 && (
                <View style={styles.buttonBeliContainer}>
                  <Text style={styles.buttonBeliText}>BELI</Text>
                </View>
              )}
            {(product.variantStatus !== 'published' ||
              product.offerStatus !== 'active' ||
              product.variantPrice === 0) && (
              <View style={styles.buttonBeliContainerDisabled}>
                <Text style={styles.buttonBeliTextDisabled}>BELI</Text>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.productBorderBottom} />
      </View>
    );
  };
  fetchProducts = async () => {
    const { keyword, page, sortBy } = this.state;
    let filterParams = { categoryId: this.props.selectedCategoryId };
    let data = await searchProduct(keyword, page + 1, filterParams, sortBy);
    if (data.hits) {
      let nextproducts = Product.fromPlain(data.hits);
      this.setState({
        fetching: false,
        products: this.state.products.concat(nextproducts),
        page: page + 1,
      });
    } else {
      this.setState({
        fetching: false,
      });
    }
  };
  loadMore = () => {
    this.setState({ fetching: true }, () => {
      this.fetchProducts();
    });
  };
  selectSortBy = async (value: string = 'Paling Sesuai') => {
    let apiValue = '';
    if (value === 'A-Z') {
      apiValue = 'name';
    }
    if (value === 'Z-A') {
      apiValue = '-name';
    }
    if (value === 'Harga Terendah') {
      apiValue = 'price';
    }
    if (value === 'Harga Tertinggi') {
      apiValue = '-price';
    }
    this.setState({ showFilterSort: false, selectedSortBy: value, sortBy: apiValue });
    const { keyword } = this.props;
    let filterParams = { categoryId: this.props.selectedCategoryId };
    let data = await searchProduct(keyword, 1, filterParams, apiValue);
    if (data.hits) {
      let nextproducts = Product.fromPlain(data.hits);
      this.setState({
        fetching: false,
        products: nextproducts,
        page: 1,
      });
    } else {
      this.setState({
        fetching: false,
      });
    }
  };
  render() {
    const { navigation, setFilter, showFilter, keyword, totalProducts, isFetching } = this.props;
    const { products, showFilterSort, sortBy, selectedSortBy } = this.state;

    const checkSelectedSortBy = (
      <View style={styles.checkContainer}>
        <Image source={require('./assets/check.png')} width={24} height={24} style={styles.check} />
      </View>
    );

    if (this.state.loading || isFetching) {
      return <LoadStructureProductList />;
    }
    if (products.length > 0) {
      return (
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={1000}
          scrollEnabled={!this.state.showFilterSort}
          onScroll={event => {
            if (this.state.fetching) {
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
              <Text style={styles.totalProductsText}>{numberFormat(totalProducts)} Produk</Text>
            </View>
            <View style={styles.filterContainerSection}>
              <View style={styles.filterSortContainer}>
                <TouchableWithoutFeedback
                  onPress={() => this.setState({ showFilterSort: !showFilterSort })}
                >
                  <View style={styles.filterContainer}>
                    <Text style={styles.filterTextSort}>{selectedSortBy}</Text>
                    <Image source={require('./assets/chevronDown.png')} style={styles.filterIcon} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <TouchableWithoutFeedback
                onPress={() => setFilter(!showFilter)}
                disabled={showFilter}
                style={styles.buttonFilterStyle}
              >
                <View style={styles.filterContainer}>
                  <Image source={require('./assets/filter.png')} style={styles.filterIcon} />
                  <Text style={styles.filterText}>Filter</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>

          {showFilterSort && (
            <View style={styles.filterDropdownContainer}>
              <View style={styles.centilanContainer}>
                <Image source={require('./assets/triangle.png')} />
              </View>
              <View style={styles.optionsContainer}>
                <TouchableWithoutFeedback onPress={() => this.selectSortBy()}>
                  <View style={styles.sortContainer}>
                    <View style={styles.sectionSortContainer}>
                      <Text style={styles.textSort}>Paling Sesuai</Text>
                    </View>
                    {selectedSortBy === 'Paling Sesuai' && checkSelectedSortBy}
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.selectSortBy('A-Z')}>
                  <View style={styles.sortContainer}>
                    <View style={styles.sectionSortContainer}>
                      <Text style={styles.textSort}>A-Z</Text>
                    </View>
                    {selectedSortBy === 'A-Z' && checkSelectedSortBy}
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.selectSortBy('Z-A')}>
                  <View style={styles.sortContainer}>
                    <View style={styles.sectionSortContainer}>
                      <Text style={styles.textSort}>Z-A</Text>
                    </View>
                    {selectedSortBy === 'Z-A' && checkSelectedSortBy}
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.selectSortBy('Harga Terendah')}>
                  <View style={styles.sortContainer}>
                    <View style={styles.sectionSortContainer}>
                      <Text style={styles.textSort}>Harga Terendah</Text>
                    </View>
                    {selectedSortBy === 'Harga Terendah' && checkSelectedSortBy}
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => this.selectSortBy('Harga Tertinggi')}>
                  <View style={[styles.sortContainer, styles.noBorderBottom]}>
                    <View style={styles.sectionSortContainer}>
                      <Text style={styles.textSort}>Harga Tertinggi</Text>
                    </View>
                    {selectedSortBy === 'Harga Tertinggi' && checkSelectedSortBy}
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          )}

          <Grid
            data={products}
            itemStyle={{
              width: 168,
              height: 350,
            }}
            onClick={(product, i) => {
              const passProps = { title: product.productName, sku: product.variantSkuNo };
              navigation.navigate('PageProductDetail', passProps);
            }}
            renderItem={(el, i) => this._renderProductItem(el, i)}
            hasLine={false}
            columnNum={3}
          />
          {this.state.fetching && <ActivityIndicator />}
        </ScrollView>
      );
    } else {
      return <ProductsNotFound keyword={keyword} />;
    }
  }
}
export default ListProductsComponent;
