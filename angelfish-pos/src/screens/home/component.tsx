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
import { setShowFilterPrices } from './action';
import { Product, Category } from '../../bmd';

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
  setShowFilterCategory: any;
  setShowFilterBrands: any;
  setShowFilterPrices: any;
  showFilter: boolean;
  showFilterCategory: boolean;
  showFilterBrands: boolean;
  showFilterPrices: boolean;
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
    this.closeFilter();
  };
  cancelFilterCategory = () => {
    this.props.setRemoveFilterCategory();
    this.backToFilter();
  };
  cancelFilterBrands = () => {
    this.backToFilter();
  };
  cancelFilterPrices = () => {
    this.backToFilter();
  };
  closeFilter = () => {
    this.props.setShowFilter(false);
    this.props.setShowFilterCategory(false);
    this.props.setShowFilterBrands(false);
    this.props.setShowFilterPrices(false);
    this.props.setChildCategory(false);
    this.props.setChildBrand(false);
  };
  backToFilter = () => {
    this.props.setShowFilter(true);
    this.props.setShowFilterCategory(false);
    this.props.setShowFilterBrands(false);
    this.props.setShowFilterPrices(false);
    this.props.setChildCategory(false);
    this.props.setChildBrand(false);
  };
  deleteFilter = () => {
    this.props.setRemoveFilter();
  };
  deleteFilterCategory = () => {
    this.props.setRemoveFilterCategory();
  };
  deleteFilterBrands = () => {
    this.props.setRemoveFilterBrands();
  };
  deleteFilterPrices = () => {
    this.props.setValueFilterPrices(0, 0);
    this.backToFilter();
  };
  render() {
    const {
      isLoading,
      products,
      brands,
      showFilter,
      showFilterCategory,
      showFilterBrands,
      showFilterPrices
    } = this.props;
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
      <Container>
        {isLoading && modalLoading}
        <Header style={styles.headerStyle} searchBar>
          <Col style={styles.headerColLeft} size={70}>
            <Grid>
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
            </Grid>
          </Col>
          <Col style={styles.headerColRight} size={30}>
            {!showFilter &&
              !showFilterCategory &&
              !showFilterBrands &&
              !showFilterPrices && (
                <View style={styles.headerRightContainer}>
                  <Text style={styles.headerRightText}>Keranjang</Text>
                </View>
              )}
            {showFilter && (
              <View style={styles.headerRightFilterContainer}>
                <TouchableWithoutFeedback onPress={this.cancelFilter}>
                  <View>
                    <Text style={styles.filterCancelText}>Batal</Text>
                  </View>
                </TouchableWithoutFeedback>
                <Text style={styles.headerRightText}>Filter</Text>
                <TouchableWithoutFeedback onPress={this.deleteFilter}>
                  <View style={styles.removeButtonContainer}>
                    <Text style={styles.filterDeleteText}>Hapus</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )}
            {showFilterCategory && (
              <View style={styles.headerRightFilterContainer}>
                <TouchableWithoutFeedback onPress={this.cancelFilterCategory}>
                  <View>
                    <Text style={styles.filterCancelText}>Batal</Text>
                  </View>
                </TouchableWithoutFeedback>
                <Text style={styles.headerRightText}>Kategori</Text>
                <TouchableWithoutFeedback onPress={this.deleteFilterCategory}>
                  <View style={styles.removeButtonContainer}>
                    <Text style={styles.filterDeleteText}>Hapus</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )}
            {showFilterBrands && (
              <View style={styles.headerRightFilterContainer}>
                <TouchableWithoutFeedback onPress={this.cancelFilterBrands}>
                  <View>
                    <Text style={styles.filterCancelText}>Batal</Text>
                  </View>
                </TouchableWithoutFeedback>
                <Text style={styles.headerRightText}>Brand</Text>
                <TouchableWithoutFeedback onPress={this.deleteFilterBrands}>
                  <View style={styles.removeButtonContainer}>
                    <Text style={styles.filterDeleteText}>Hapus</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )}
            {showFilterPrices && (
              <View style={styles.headerRightFilterContainer}>
                <TouchableWithoutFeedback onPress={this.cancelFilterPrices}>
                  <View>
                    <Text style={styles.filterCancelText}>Batal</Text>
                  </View>
                </TouchableWithoutFeedback>
                <Text style={styles.headerRightText}>Harga</Text>
                <TouchableWithoutFeedback onPress={this.deleteFilterPrices}>
                  <View style={styles.removeButtonContainer}>
                    <Text style={styles.filterDeleteText}>Hapus</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            )}
          </Col>
        </Header>
        <Container>
          <Grid>
            <Col style={styles.contentColLeft} size={70}>
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
            </Col>
            <Col style={styles.contentColRight} size={30}>
              <View style={styles.contentColRightContainer}>
                <View style={{ padding: 16, alignItems: 'flex-start' }}>
                  {(showFilter || showFilterCategory || showFilterBrands || showFilterPrices) && (
                    <FilterProducts />
                  )}
                  {!showFilter &&
                    !showFilterCategory &&
                    !showFilterBrands &&
                    !showFilterPrices && (
                      <View>
                        <Text>Navigation For Testing:</Text>
                        <View style={{ paddingVertical: 5 }} />
                        <TouchableWithoutFeedback
                          onPress={() => this.props.navigation.navigate('PageServerError')}
                        >
                          <View style={styles.buttonBottomStyle}>
                            <Text style={styles.buttonBottomText}>Page Server Error</Text>
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                    )}
                </View>
                <View style={styles.buttonBottomContainer}>
                  {!showFilter && (
                    <TouchableWithoutFeedback
                      onPress={() =>
                        Alert.alert('Konfirmasi!', 'Apakah anda yakin akan keluar?', [
                          { text: 'Ya', onPress: () => this._signOutAsync() },
                          { text: 'Tidak' }
                        ])
                      }
                    >
                      <View style={styles.buttonBottomStyle}>
                        <Text style={styles.buttonBottomText}>LOGOUT</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                </View>
              </View>
            </Col>
          </Grid>
        </Container>
      </Container>
    );
  }
}

export default { HomeComponent };
