import React from 'react';
import Expo from 'expo';
import { AsyncStorage, View, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Container, Header, Content, Item, Input, Icon, Button, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';
import styles from './styles';
import numberFormat from '../../helpers/number-format';
import { Product } from '../home/reducer';
import { SearchResultList } from '../../components/search-result-list';
import { ListProducts } from '../../components/list-products';
import { ListCategories } from '../../components/list-categories';

interface HomeComponentProps extends NavigationScreenProps<any, any> {
  search: any;
  products: Product[];
}

export class HomeComponent extends React.Component<HomeComponentProps, any> {
  static navigationOptions = {
    header: null,
    keyword: ''
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
      this.props.search(text).then(() => {
        this.setState({
          keyword: text,
          searchAutoComplete: true,
          searchResults: false,
          showCancelButton: true
        });
      });
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
    return this.state.keyword === undefined || this.state.keyword.length === 0;
  };
  render() {
    const products = this.props.products;
    return (
      <Container>
        <Header style={styles.headerStyle} searchBar>
          <Col style={styles.headerColLeft} size={70}>
            <Grid>
              <Item style={styles.searchContainer}>
                <Icon name="ios-search" />
                <Input
                  placeholder="Cari"
                  value={this.state.keyword}
                  onChangeText={this.onChangeTextSearch}
                  onSubmitEditing={() => {
                    Keyboard.dismiss();
                    this.onSubmitSearch(this.state.keyword);
                  }}
                />
                {!this.isKeywordEmpty() && (
                  <Button
                    transparent
                    dark
                    style={styles.buttonClearSearch}
                    onPress={() =>
                      this.setState({
                        searchAutoComplete: false,
                        showCancelButton: false,
                        keyword: ''
                      })
                    }
                  >
                    <Icon name="ios-close-circle" color="grey" />
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
                      keyword: '',
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
            <View style={styles.headerRightContainer}>
              <Text style={styles.headerRightText}>Keranjang</Text>
            </View>
          </Col>
        </Header>
        <Container>
          <Grid>
            <Col style={styles.contentColLeft} size={70}>
              {this.state.searchAutoComplete &&
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
                />
              )}
            </Col>
            <Col style={styles.contentColRight} size={30}>
              <View style={{ padding: 16 }}>
                <Text>Navigation For Testing:</Text>
                <View style={{ paddingVertical: 5 }} />
                <Button primary onPress={() => this.props.navigation.navigate('PageServerError')}>
                  <Text> Page Server Error </Text>
                </Button>
              </View>
            </Col>
          </Grid>
        </Container>
      </Container>
    );
  }
}

export default { HomeComponent };
