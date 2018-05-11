import React from 'react';
import Expo from 'expo';
import {
  AsyncStorage,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Dimensions,
  Image,
  Alert,
  Modal
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Container, Header, Content, Item, Input, Icon, Button, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import styles from './styles';
import numberFormat from '../../helpers/number-format';
import { SearchResultList } from '../../components/search-result-list';
import { ListProducts } from '../../components/list-products';
import { ListCategories } from '../../components/list-categories';
import { FilterProducts } from '../../components/filter-products';
import store from '../../store/store';
import config from '../../config';
import { ActivityIndicator } from 'react-native';
import { Product, Category } from '../../bmd';
import { Keranjang } from '../../components/keranjang';

interface HomeComponentProps extends NavigationScreenProps<any, any> {
  isLoading: boolean;
  startLoading?: any;
  endLoading?: any;
  search: any;
  loadCategories: any;
  emptySearch: any;
  keyword: string;
  products: Product[];
  totalProducts: number;
  totalPage: number;
  selectedCategoryId: string;
  selectedCategoryName: string;
  setShowFilter: any;
  showFilter: boolean;
  brands: any[];
  setRemoveFilter: any;
  navigation: any;
  page: number;
  selectedBrands?: any[];
  setRemoveFilterCategory?: any;
  setRemoveFilterBrands?: any;
  setChildCategory?: any;
  setChildBrand?: any;
  priceRange: any;
  setValueFilterPrices: any;
  isCategoriesLoading: boolean;
  categories: Category[];
}

export class HomeComponent extends React.Component<HomeComponentProps, any> {
  static navigationOptions = {
    header: null
  };
  constructor(props: HomeComponentProps) {
    super(props);
    this.props.loadCategories();
    this.state = {
      searchAutoComplete: false,
      searchResults: false,
      showCancelButton: false
    };
  }
  componentDidMount() {
    this.props.endLoading();
  }
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Welcome');
  };
  onChangeTextSearch = text => {
    if (text.length >= 3) {
      this.setState({
        searchAutoComplete: true,
        searchResults: false,
        showCancelButton: true
      });
      this.props.search(text, 1);
    } else {
      this.setState({ searchAutoComplete: false, showCancelButton: true });
    }
  };
  onSubmitSearch = (keyword: string) => {
    if (keyword !== '' && keyword !== undefined) {
      this.setState({ searchAutoComplete: false, searchResults: true });
    }
  };
  isKeywordEmpty = () => {
    return this.props.keyword === undefined || this.props.keyword.length === 0;
  };
  cancelFilter = () => {
    this.props.setShowFilter(false);
  };
  backToFilter = () => {
    this.props.setShowFilter(true);
  };
  deleteFilter = () => {
    this.props.setRemoveFilter();
    this.props.setShowFilter(true);
  };

  render() {
    const { isLoading, products, brands, showFilter } = this.props;
    const modalLoading = (
      <Modal animationType="none" transparent={false} visible={isLoading}>
        <View
          style={{
            flex: 1,
            backgroundColor: config.color.black,
            opacity: 0.8,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <ActivityIndicator color={config.color.white} size="large" />
        </View>
      </Modal>
    );
    return (
      <View style={styles.container}>
        {isLoading && modalLoading}
        <View style={styles.leftColumn}>
          <Header style={styles.headerStyle} searchBar>
            <Item style={styles.searchContainer}>
              <Icon name="ios-search" />
              <Input
                placeholder="Cari"
                value={this.props.keyword}
                onChangeText={this.onChangeTextSearch}
                onSubmitEditing={() => {
                  Keyboard.dismiss();
                  this.onSubmitSearch(this.props.keyword);
                }}
                autoCorrect={false}
                returnKeyType="search"
              />
              {!this.isKeywordEmpty() && (
                <Button
                  transparent
                  dark
                  style={styles.buttonClearSearch}
                  onPress={() => {
                    this.props.emptySearch();
                    this.setState({
                      searchAutoComplete: false,
                      showCancelButton: false
                    });
                  }}
                >
                  <Image source={require('./assets/cancel.png')} style={styles.iconCancel} />
                </Button>
              )}
            </Item>

            {this.state.showCancelButton && (
              <Button
                transparent
                onPress={() => {
                  Keyboard.dismiss();
                  this.setState({
                    searchAutoComplete: false,
                    searchResults: false,
                    showCancelButton: false
                  });
                  this.props.setShowFilter(false);
                }}
              >
                <Text style={styles.searchCancelText}>Batal</Text>
              </Button>
            )}
          </Header>
          <View>
            {this.state.searchAutoComplete &&
              products &&
              products.length > 0 && (
                <SearchResultList
                  products={products}
                  maxItem={3}
                  navigation={this.props.navigation}
                />
              )}

            {!this.state.searchAutoComplete &&
              !this.state.searchResults &&
              !this.props.isCategoriesLoading && (
                <ListCategories
                  categories={this.props.categories}
                  navigation={this.props.navigation}
                />
              )}

            {this.state.searchResults && (
              <ListProducts
                navigation={this.props.navigation}
                keyword={this.state.keyword}
                totalProducts={this.props.totalProducts}
                searchProduct={this.props.search}
              />
            )}
          </View>
        </View>
        <View style={styles.rightColumn}>
          {!showFilter && <Keranjang _signOutAsync={this._signOutAsync} />}
          {showFilter && (
            <FilterProducts cancelFilter={this.cancelFilter} deleteFilter={this.deleteFilter} />
          )}
        </View>
      </View>
    );
  }
}

export default { HomeComponent };
