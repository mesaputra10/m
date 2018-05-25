import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';
import { numberFormat } from '../../../helpers/number-format';

export class Price extends Component<any, any> {
  render() {
    const { normalPrice, specialPrice, discount } = this.props;
    const finalPrice = specialPrice ? specialPrice : normalPrice;
    return (
      <View style={styles.rowSectionContainer}>
        {specialPrice && (
          <View style={styles.priceContainer}>
            <Text style={styles.priceBeforeDiscount}>Rp {numberFormat(normalPrice)}</Text>
            <Text style={styles.discountPrice}>{discount} %</Text>
          </View>
        )}
        <Text style={styles.finalPrice}>Rp {numberFormat(finalPrice)}</Text>
      </View>
    );
  }
}
