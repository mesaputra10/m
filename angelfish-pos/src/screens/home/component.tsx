import React from 'react';
import Expo from 'expo';
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  Alert,
  ScrollView,
  Image,
  ActivityIndicator,
  ImageBackground,
  TouchableWithoutFeedback
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Button, Divider } from 'react-native-elements';
import { SearchBar, Grid, List } from 'antd-mobile';
import { DataItem } from 'antd-mobile/lib/grid/PropsType';
import styles from './styles';
import numberFormat from '../../helpers/number-format';
import generateUniqKey from '../../helpers/generate-uniq-key';
import { Product } from '../home/reducer';

const categories: Array<DataItem> = [
  { name: 'Aksesoris Komputer' },
  { name: 'Desktop & Notebooks' },
  { name: 'Alat Tulis & Peralatan Kantor' },
  { name: 'Server, Network & Power System' },
  { name: 'Tablets & Gadgets' },
  { name: 'Foto & Videografi' },
  { name: 'Alat Musik & Pro Audio' },
  { name: 'Sport & Fitness' }
];

interface HomeComponentProps extends NavigationScreenProps<any, any> {
  search: any;
  products: Product[];
}

const Item = List.Item;

export class HomeComponent extends React.Component<HomeComponentProps, any> {
  static navigationOptions = {
    header: null
  };
  constructor(props: HomeComponentProps) {
    super(props);
    this.state = {
      searchAutoComplete: false,
      searchResults: false
    };
  }
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Welcome');
  };
  _renderItem = (el, index) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemBox}>
          <Text style={{ textAlign: 'center' }}>{el.name}</Text>
        </View>
      </View>
    );
  };
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
                    Rp. {numberFormat(product.offerNormalPrice)}
                  </Text>
                )}
              </View>
            )}
            {product.variantPrice > 0 &&
              product.variantPrice !== product.offerNormalPrice && (
                <Text style={styles.searchResultText}>
                  Rp. {numberFormat(product.offerSpecialPrice)}
                </Text>
              )}
            {product.variantPrice === product.offerNormalPrice && (
              <Text style={styles.searchResultText}>Rp. {numberFormat(product.variantPrice)}</Text>
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
  onChangeTextSearch = text => {
    if (text.length >= 3) {
      setTimeout(() => {
        this.props.search(text).then(() => this.setState({ searchAutoComplete: true }));
      }, 500);
    }
  };
  onSubmitSearch = (keyword: string) => {
    if (keyword !== '' && keyword !== undefined) {
      this.setState({ searchAutoComplete: false, searchResults: true });
    }
  };
  render() {
    const products = this.props.products;
    return (
      <View style={styles.container}>
        <View style={styles.containerColumn}>
          <View style={styles.leftPart}>
            <View style={{ padding: 10 }}>
              <SearchBar
                cancelText="Batal"
                placeholder="Cari"
                maxLength={50}
                onChange={this.onChangeTextSearch}
                onCancel={() => this.setState({ searchAutoComplete: false, searchResults: false })}
                onSubmit={keyword => this.onSubmitSearch(keyword)}
              />
            </View>
            <ScrollView>
              {this.state.searchAutoComplete &&
                products.slice(0, 5).map((product, index) => {
                  const productImage =
                    product.variantImageThumbnail !== ''
                      ? { uri: product.variantImageThumbnail }
                      : require('./assets/icGreyNoImage.png');
                  return (
                    <View key={generateUniqKey(index)}>
                      <List>
                        <Item
                          multipleLine
                          onClick={() => {
                            const passProps = {
                              title: product.productName,
                              sku: product.variantSkuNo
                            };
                            this.props.navigation.navigate('PageProductDetail', passProps);
                          }}
                        >
                          <View style={styles.searchResultListItemContainer}>
                            <View style={styles.searchResultListItemLeft}>
                              <Image source={productImage} style={styles.searchResultImage} />
                            </View>
                            <View style={styles.searchResultListItemRight}>
                              <Text style={styles.searchResultText}>{product.productName}</Text>
                              {product.variantPrice > 0 && (
                                <View style={styles.searchResultPriceContainer}>
                                  {product.variantPrice !== product.offerNormalPrice && (
                                    <Text style={styles.searchResultPriceDiscountText}>
                                      Rp. {numberFormat(product.offerNormalPrice)}
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
                              {product.variantPrice > 0 &&
                                product.variantPrice !== product.offerNormalPrice && (
                                  <Text style={styles.searchResultText}>
                                    Rp. {numberFormat(product.offerSpecialPrice)}
                                  </Text>
                                )}
                              {product.variantPrice === product.offerNormalPrice && (
                                <Text style={styles.searchResultText}>
                                  Rp. {numberFormat(product.variantPrice)}
                                </Text>
                              )}
                              {product.variantPrice === 0 && (
                                <Text style={styles.searchResultEmptyStockText}>Stok Habis</Text>
                              )}
                            </View>
                          </View>
                        </Item>
                      </List>
                    </View>
                  );
                })}
              {!this.state.searchAutoComplete &&
                !this.state.searchResults && (
                  <Grid
                    data={categories}
                    itemStyle={{
                      width: 145,
                      height: 145
                    }}
                    onClick={(el, i) => {
                      console.log(`el: ${JSON.stringify(el)} | i: ${i}`);
                      const passProps = { title: el.name };
                      this.props.navigation.navigate('PageCategory', passProps);
                    }}
                    renderItem={(el, i) => this._renderItem(el, i)}
                    hasLine={false}
                  />
                )}
              {this.state.searchResults && (
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
              )}
            </ScrollView>
          </View>
          <View style={styles.rightPart}>
            <View style={styles.titleRight}>
              <Text style={styles.titleRightText}>Keranjang</Text>
            </View>
            <View style={styles.contentContainer}>
              <Button title="Logout" onPress={this._signOutAsync} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default { HomeComponent };
