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
  Alert
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Container, Header, Content, Item, Input, Icon, Button, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import styles from './styles';
import numberFormat from '../../helpers/number-format';
import { Product } from '../home/reducer';
import { SearchResultList } from '../../components/search-result-list';
import { ListProducts } from '../../components/list-products';
import { ListCategories } from '../../components/list-categories';
import { FilterProducts } from '../../components/filter-products';
import store from '../../store/store';

interface HomeComponentProps extends NavigationScreenProps<any, any> {
  search: any;
  emptySearch: any;
  keyword: string;
  products: Product[];
  totalProducts: number;
  totalPage: number;
  setFilter: any;
  selectedCategoryId: string;
  selectedCategoryName: string;
  showFilter: boolean;
  brands: any[];
  selectedBrandId: string;
  selectedBrandName: string;
  setRemoveFilter: any;
  navigation: any;
  page: number;
}

export class HomeComponent extends React.Component<HomeComponentProps, any> {
  static navigationOptions = {
    header: null
  };
  constructor(props: HomeComponentProps) {
    super(props);
    this.state = {
      searchAutoComplete: false,
      searchResults: false,
      showCancelButton: false
    };
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
    this.props.setFilter(false);
  };
  deleteFilter = () => {
    this.props.setRemoveFilter();
  };
  getProducts = () => {
    const { selectedCategoryId, selectedBrandId } = this.props;
    const filterParams = { categoryId: selectedCategoryId, brandId: selectedBrandId };
    this.props.search(this.props.keyword, 1, filterParams);
    this.props.setFilter(false);
  };
  render() {
    const { products, brands, showFilter } = this.props;

    return (
      <Container>
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
                    this.props.setFilter(false);
                  }}
                >
                  <Text style={styles.searchCancelText}>Batal</Text>
                </Button>
              )}
            </Grid>
          </Col>
          <Col style={styles.headerColRight} size={30}>
            {!showFilter && (
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
                  <View>
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
                !this.state.searchResults && <ListCategories navigation={this.props.navigation} />}

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
                  {showFilter && <FilterProducts />}
                  {!showFilter && (
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
                  {showFilter && (
                    <TouchableWithoutFeedback onPress={this.getProducts}>
                      <View style={styles.buttonBottomStyle}>
                        <Text style={styles.buttonBottomText}>TERAPKAN</Text>
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
