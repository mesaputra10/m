import React from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Text,
  Dimensions,
  Image,
  Alert,
  Modal,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import styles from './styles';
import { SearchResultList } from '../../components/search-result-list';
import { ListProducts } from '../../components/list-products';
import { ListCategories } from '../../components/list-categories';
import { FilterProducts } from '../../components/filter-products';
import config from '../../config';
import { Product, Category } from '../../bmd';
import { Keranjang } from '../../components/keranjang';
import { Layout } from '../../components/layout';
import { SearchBar } from '../../components/search-bar';
import { HistoryProductSearch } from '../../components/history-product-search';

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
  showSearchResults: boolean;
  setShowSearchResults?: any;
  setShowParentCategory?: any;
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
      showCancelButton: false,
      showHeaderCategory: false,
      categoryName: 'Kategori',
      showSearchHistory: false,
      keyword: ''
    };
    this.onChangeTextSearch = this.onChangeTextSearch.bind(this);
  }
  componentDidMount() {
    this.props.endLoading();
  }
  onChangeTextSearch = text => {
    if (text.length >= 3) {
      this.setState({
        searchAutoComplete: true,
        searchResults: false,
        showCancelButton: true,
        showSearchHistory: false,
        keyword: text
      });
      this.props.search(text, 1);
    } else {
      this.setState({ searchAutoComplete: false, showCancelButton: true });
    }
  };
  actionSearchWithHistory = keyword => {
    this.props.search(keyword, 1);
    Keyboard.dismiss();
    this.onSubmitSearch(keyword);
    this.toggleSearchHistory();
    this.setState({ keyword });
  };
  actionSubmitEditingSearch = () => {
    const { keyword } = this.state;
    this.props.search(keyword, 1);
    this.addKeywordToProductSearchHistories(keyword);
    Keyboard.dismiss();
    this.onSubmitSearch(this.state.keyword);
    this.toggleSearchHistory();
  };
  actionCancelSearch = () => {
    Keyboard.dismiss();
    this.setState({
      searchAutoComplete: false,
      searchResults: false,
      showCancelButton: false,
      keyword: ''
    });
    this.props.setShowFilter(false);
    this.props.setShowSearchResults(false);
    this.toggleSearchHistory(false);
  };
  actionClearSearch = () => {
    const { showSearchHistory } = this.state;
    this.setState({ keyword: '' });
  };
  addKeywordToProductSearchHistories = async text => {
    if (text === '') return null;
    const key = config.key.historyProductSearch;
    let histories: any = await AsyncStorage.getItem(key);
    if (histories !== null) {
      const dataHistories = histories.split(',');
      if (dataHistories.length >= 5) {
        dataHistories.shift();
        dataHistories.push(text);
        histories = dataHistories.join();
      } else {
        histories = histories + ',' + text;
      }
    } else {
      histories = text;
    }
    await AsyncStorage.setItem(key, histories);
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
  setShowHeaderCategory = categoryName => {
    this.setState({
      showHeaderCategory: !this.state.showHeaderCategory,
      categoryName
    });
  };
  backCategory = () => {
    this.setShowHeaderCategory('');
    this.props.setShowParentCategory(true);
    this.setState({ searchResults: false });
    this.props.setShowSearchResults(false);
    this.props.setShowFilter(false);
  };
  actionOnFocus = () => {
    this.setState({ searchResults: false });
    this.props.setShowSearchResults(false);
    this.toggleSearchHistory(true);
  };
  toggleSearchHistory = (value: boolean = undefined) => {
    const showSearchHistory = value === undefined ? !this.state.showSearchHistory : value;
    this.setState({ showSearchHistory });
  };
  render() {
    const { isLoading, products, brands, showFilter } = this.props;
    const { showHeaderCategory, categoryName, showSearchHistory } = this.state;
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

    const customHeaderSearch = showHeaderCategory ? { paddingTop: 5 } : null;

    const leftColumn = (
      <View>
        {showHeaderCategory && (
          <View style={styles.headerStyleCustom}>
            <View style={styles.headerCategoryContainer}>
              <View style={styles.buttonBackCategoryContainer}>
                <TouchableWithoutFeedback onPress={this.backCategory}>
                  <View style={styles.backCategory}>
                    <Image source={require('./assets/backArrow.png')} />
                    <Text style={styles.backCategoryText}>Kategori</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.titleCategoryContainer}>
                <View style={styles.titleCategory}>
                  <Text style={styles.titleCategoryName}>{categoryName}</Text>
                </View>
              </View>
            </View>
          </View>
        )}
        <View style={[styles.headerStyle, customHeaderSearch]}>
          <SearchBar
            actionSearch={this.onChangeTextSearch}
            keyword={this.state.keyword}
            actionCancel={this.actionCancelSearch}
            actionClear={this.actionClearSearch}
            autoFocus={false}
            actionSubmitEditing={this.actionSubmitEditingSearch}
            actionOnFocus={this.actionOnFocus}
          />
        </View>
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
            !this.props.isCategoriesLoading &&
            !this.props.showSearchResults &&
            showSearchHistory && (
              <HistoryProductSearch
                actionSearch={this.actionSearchWithHistory}
                navigation={this.props.navigation}
              />
            )}
          {!this.state.searchAutoComplete &&
            !this.state.searchResults &&
            !this.props.isCategoriesLoading &&
            !this.props.showSearchResults &&
            !showSearchHistory && (
              <ListCategories
                categories={this.props.categories}
                setShowHeaderCategory={this.setShowHeaderCategory}
              />
            )}

          {(this.state.searchResults || this.props.showSearchResults) && (
            <ListProducts
              navigation={this.props.navigation}
              keyword={this.state.keyword}
              totalProducts={this.props.totalProducts}
              searchProduct={this.props.search}
            />
          )}
        </View>
      </View>
    );
    const rightColumn = !showFilter ? (
      <Keranjang navigation={this.props.navigation} />
    ) : (
      <FilterProducts cancelFilter={this.cancelFilter} deleteFilter={this.deleteFilter} />
    );
    return <Layout leftColumn={leftColumn} rightColumn={rightColumn} />;
  }
}

export default { HomeComponent };
