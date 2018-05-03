import React from 'react';
import Expo from 'expo';
import {
  AsyncStorage,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Dimensions,
  Image
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
      this.props.search(text);
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
  getProducts = () => {
    const { selectedCategoryId } = this.props;
    const filterParams = { categoryId: selectedCategoryId };
    this.props.search(this.props.keyword, filterParams);
  };
  render() {
    const products = this.props.products;
    const showFilter = store.getState().listProductsReducer.showFilter;

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
                  }}
                >
                  <Text>Batal</Text>
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
                    <Text
                      style={{
                        justifyContent: 'center',
                        paddingTop: 16,
                        color: 'rgb(47, 120, 207)'
                      }}
                    >
                      Batal
                    </Text>
                  </View>
                </TouchableWithoutFeedback>
                <Text style={styles.headerRightText}>Filter</Text>
                <Text style={{ justifyContent: 'center', paddingTop: 16 }}>Hapus</Text>
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
                  products={products}
                  keyword={this.state.keyword}
                  totalProducts={this.props.totalProducts}
                />
              )}
            </Col>
            <Col style={styles.contentColRight} size={30}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <View style={{ padding: 16, alignItems: 'flex-start' }}>
                  {showFilter && <FilterProducts />}
                  {!showFilter && (
                    <View>
                      <Text>Navigation For Testing:</Text>
                      <View style={{ paddingVertical: 5 }} />
                      <Button
                        primary
                        onPress={() => this.props.navigation.navigate('PageServerError')}
                      >
                        <Text> Page Server Error </Text>
                      </Button>
                    </View>
                  )}
                </View>
                <View style={styles.buttonBottomContainer}>
                  {!showFilter && (
                    <Button onPress={this._signOutAsync} style={styles.buttonBottomStyle}>
                      <Text>Logout</Text>
                    </Button>
                  )}
                  {showFilter && (
                    <Button onPress={this.getProducts} style={styles.buttonBottomStyle}>
                      <Text>Terapkan</Text>
                    </Button>
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
