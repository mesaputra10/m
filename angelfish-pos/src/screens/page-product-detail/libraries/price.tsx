import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';
import { numberFormat } from '../../../helpers/number-format';

interface componentProps {
  normalPrice: number;
  specialPrice: specialPrice;
  offerStatus: string;
}

interface specialPrice {
  isActive: boolean;
  startDate: string;
  endDate: string;
  specialPrice: number;
}

export class Price extends Component<componentProps, any> {
  render() {
    const { normalPrice, specialPrice, offerStatus } = this.props;
    const finalPrice = specialPrice.isActive ? specialPrice.specialPrice : normalPrice;
    const countDiscount = (normalPrice - specialPrice.specialPrice) / normalPrice * 100;
    const displayDiscount = countDiscount.toFixed(2);
    if (normalPrice > 0) {
      return (
        <View style={styles.rowSectionContainer}>
          {specialPrice.isActive &&
            offerStatus === 'active' &&
            normalPrice > 0 && (
              <View style={styles.priceContainer}>
                <Text style={styles.priceBeforeDiscount}>Rp {numberFormat(normalPrice)}</Text>
                <Text style={styles.discountPrice}>{displayDiscount} %</Text>
              </View>
            )}
          <Text style={styles.finalPrice}>Rp {numberFormat(finalPrice)}</Text>
        </View>
      );
    } else {
      <View style={styles.rowSectionContainer}>
        <Text style={styles.finalPrice}>Stok Habis}</Text>
      </View>;
    }
  }
}
