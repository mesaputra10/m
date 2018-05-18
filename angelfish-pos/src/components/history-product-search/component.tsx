import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  AsyncStorage,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Alert,
  Image
} from 'react-native';
import styles from './styles';
import config from '../../config';
import { uniq } from 'lodash';

export class HistoryProductSearchComponent extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      histories: [],
      productHistories: []
    };
  }
  componentDidMount() {
    setTimeout(() => this.getHistories(), 500);
  }
  getHistories = async () => {
    const histories: string = await AsyncStorage.getItem(config.key.historyProductSearch);
    const historiesOfProductsString: string = await AsyncStorage.getItem(
      config.key.historyProductVisited
    );
    const historiesOfProducts =
      historiesOfProductsString !== null ? JSON.parse(historiesOfProductsString) : [];

    if (histories !== null) {
      const arrHistories = histories.split(',');
      this.setState({
        isLoaded: true,
        histories: uniq(arrHistories).reverse(),
        productHistories: historiesOfProducts.reverse()
      });
    } else {
      this.setState({ isLoaded: true, histories: [], productHistories: historiesOfProducts });
    }
  };
  removeHistories = () => {
    Alert.alert('Konfirmasi!', 'Apakah anda yakin akan menghapus riwayat pencarian?', [
      { text: 'Ya', onPress: () => this.actionRemoveHistories() },
      { text: 'Tidak' }
    ]);
  };
  actionRemoveHistories = async () => {
    this.setState({ isLoaded: false });
    await AsyncStorage.removeItem(config.key.historyProductSearch);
    await AsyncStorage.removeItem(config.key.historyProductVisited);
    this.getHistories();
  };
  onPressKeyword = history => {
    const { actionSearch } = this.props;
    actionSearch(history);
  };
  onPressImage = product => {
    this.props.navigation.navigate('PageProductDetail', product);
  };
  render() {
    const { isLoaded, histories, productHistories } = this.state;

    if (!isLoaded) {
      return (
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.container}>
            <ActivityIndicator color={config.color.blue} />
          </View>
        </ScrollView>
      );
    }
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          scrollEventThrottle={1000}
        >
          <View>
            {histories.length > 0 && (
              <View>
                <Text style={styles.titleHistoryText}>RIWAYAT PENCARIAN</Text>
                {histories.map(history => {
                  return (
                    <TouchableWithoutFeedback
                      key={history}
                      onPress={() => this.onPressKeyword(history)}
                    >
                      <View>
                        <Text style={styles.historyText}>{history}</Text>
                      </View>
                    </TouchableWithoutFeedback>
                  );
                })}
              </View>
            )}
            {productHistories.length > 0 && (
              <View>
                <Text style={styles.titleHistoryText}>PRODUK YANG TERAKHIR DILIHAT</Text>
                <ScrollView
                  showsHorizontalScrollIndicator={false}
                  keyboardShouldPersistTaps="always"
                  scrollEventThrottle={1000}
                  horizontal={true}
                >
                  {productHistories.map((productHistory, index) => {
                    const keyElement = productHistory.sku + '-' + index;
                    const productImage =
                      productHistory.productImage !== ''
                        ? { uri: productHistory.productImage }
                        : require('./assets/icGreyNoImage.png');

                    return (
                      <TouchableWithoutFeedback
                        key={keyElement}
                        onPress={() => this.onPressImage(productHistory)}
                      >
                        <View>
                          <Image source={productImage} style={{ width: 80, height: 80 }} />
                        </View>
                      </TouchableWithoutFeedback>
                    );
                  })}
                </ScrollView>
              </View>
            )}
            {(histories.length > 0 || productHistories.length > 0) &&
              histories !== null && (
                <TouchableWithoutFeedback onPress={this.removeHistories}>
                  <View>
                    <Text style={styles.removeHistoryText}>Hapus Semua</Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default HistoryProductSearchComponent;
