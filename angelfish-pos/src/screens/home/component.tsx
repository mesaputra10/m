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
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Button, Divider } from 'react-native-elements';
import { SearchBar } from 'antd-mobile';
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
      searchResults: false
    };
  }
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Welcome');
  };
  onChangeTextSearch = text => {
    if (text.length >= 3) {
      this.props.search(text).then(() => {
        this.setState({ keyword: text, searchAutoComplete: true, searchResults: false });
      });
    } else {
      this.setState({ searchAutoComplete: false });
    }
  };
  onSubmitSearch = (keyword: string) => {
    if (keyword !== '' && keyword !== undefined) {
      this.setState({ searchAutoComplete: false, searchResults: true });
    }
  };
  render() {
    const products = this.props.products;
    console.log('products props: ', products[0]);
    return (
      <View style={styles.container}>
        <View style={styles.containerColumn}>
          <View style={styles.leftPart}>
            <SearchBar
              cancelText="Batal"
              placeholder="Cari"
              maxLength={50}
              onChange={this.onChangeTextSearch}
              onSubmit={keyword => {
                Keyboard.dismiss();
                this.onSubmitSearch(keyword);
              }}
              onCancel={() => {
                Keyboard.dismiss();
                this.setState({ searchAutoComplete: false, searchResults: false });
              }}
            />
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
          </View>
          <View style={styles.rightPart}>
            <View style={styles.titleRight}>
              <Text style={styles.titleRightText}>Keranjang</Text>
            </View>
            <View>
              <Text>Navigation For Testing:</Text>
              <View style={{ paddingVertical: 5 }} />
              <Button
                title="Page Server Error"
                onPress={() => this.props.navigation.navigate('PageServerError')}
              />
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
