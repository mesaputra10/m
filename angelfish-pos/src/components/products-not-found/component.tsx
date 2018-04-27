import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

export class ProductsNotFoundComponent extends Component<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('./assets/imProductEmptyGrey128Dp.png')} />
        </View>
        <Text style={styles.titleText}>Produk Tidak Ditemukan</Text>
        <Text style={styles.contentText}>
          Maaf produk yang Anda cari "{this.props.keyword}" tidak ditemukan/tidak tersedia
        </Text>
      </View>
    );
  }
}

export default ProductsNotFoundComponent;
