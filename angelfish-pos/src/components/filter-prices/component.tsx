import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { Content, List, ListItem } from 'native-base';
import styles from './styles';
import generateUniqKey from '../../helpers/generate-uniq-key';
import config from '../../config';
import numberFormat from '../../helpers/number-format';

interface FilterPricesComponentProps {
  setValueFilterPrices?: any;
  cancelFilterPrices?: any;
  deleteFilterPrices?: any;
  minPriceRange?: number;
  maxPriceRange?: number;
}

interface componentState {
  min: number;
  max: number;
}

export class FilterPricesComponent extends Component<FilterPricesComponentProps, componentState> {
  maxInput: {};
  constructor(props) {
    super(props);
    this.state = {
      min: props.minPriceRange,
      max: props.maxPriceRange,
    };
  }
  onPressTerapkan = () => {
    const { min, max } = this.state;
    const minValue = this.removeDot(min.toString());
    const maxValue = this.removeDot(max.toString());
    if (maxValue === 0) {
      Alert.alert('Error', 'Harga maksimum tidak boleh 0!');
      return null;
    }
    if (maxValue < minValue) {
      Alert.alert('Error', 'Harga maksimum tidak boleh kurang dari harga minimum!');
      return null;
    }
    this.props.setValueFilterPrices(minValue, maxValue);
    this.props.cancelFilterPrices();
  };
  setValueMin = (min: string) => {
    if (min.length <= 3) return null;
    const minString = this.handlePriceEmpty(min);
    const replaceRp = this.replaceRp(minString);
    const val = this.removeDot(replaceRp);
    this.setState({ min: numberFormat(val) });
  };
  setValueMax = (max: string) => {
    if (max.length <= 3) return null;
    const maxString = this.handlePriceEmpty(max);
    const replaceRp = this.replaceRp(maxString);
    const val = this.removeDot(replaceRp);
    this.setState({ max: numberFormat(val) });
  };
  handlePriceEmpty = (value: string) => {
    return value.length > 0 ? value.toString() : '0';
  };
  replaceRp = (value: string) => value.replace('Rp ', '');
  removeDot = (value: string) => {
    if (value.length > 0) {
      const withOutDot = value.replace(/[.]/g, '');
      return parseFloat(withOutDot);
    }
    return 0;
  };
  deleteFilter = () => {
    this.setState({ max: 0, min: 0 });
    this.props.setValueFilterPrices(0, 0);
  };
  render() {
    const { min, max } = this.state;
    const minFloat = this.removeDot(min.toString());
    const maxFloat = this.removeDot(max.toString());
    const disableTerapkan = min === 0 || max === 0 || maxFloat < minFloat;
    const disableTerapkanStyle = disableTerapkan ? { backgroundColor: config.color.grey } : null;
    const minValue = `Rp ${numberFormat(min)}`;
    const maxValue = `Rp ${numberFormat(max)}`;
    const filterDeleteText = disableTerapkan
      ? styles.filterDeleteText
      : [styles.filterDeleteText, { color: config.color.blue }];
    return (
      <View style={styles.container}>
        <View style={styles.headerRightFilterContainer}>
          <TouchableWithoutFeedback onPress={this.props.cancelFilterPrices}>
            <View>
              <Text style={styles.filterCancelText}>Batal</Text>
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.headerRightText}>Harga</Text>
          <TouchableWithoutFeedback onPress={this.deleteFilter}>
            <View style={styles.removeButtonContainer}>
              <Text style={filterDeleteText}>Hapus</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.hargaMinMaxLabel}>Harga Minimum</Text>
            <TextInput
              placeholder="Rp 25.000"
              value={minValue}
              style={styles.textInputStyle}
              multiline={false}
              numberOfLines={1}
              maxLength={20}
              onChangeText={this.setValueMin}
              keyboardType="numeric"
              returnKeyType="next"
              onSubmitEditing={() => {
                this.maxInput.focus();
              }}
            />
            <View style={styles.separateFormElement} />
            <Text style={styles.hargaMinMaxLabel}>Harga Maksimum</Text>
            <TextInput
              placeholder="Rp 18.000.000"
              value={maxValue}
              style={styles.textInputStyle}
              multiline={false}
              numberOfLines={1}
              maxLength={20}
              onChangeText={this.setValueMax}
              keyboardType="numeric"
              ref={input => {
                this.maxInput = input;
              }}
              onSubmitEditing={this.onPressTerapkan}
              returnKeyType="go"
            />
          </View>
        </View>
        <View style={styles.buttonBottomContainer}>
          <TouchableWithoutFeedback onPress={this.onPressTerapkan} disabled={disableTerapkan}>
            <View style={[styles.buttonBottomStyle, disableTerapkanStyle]}>
              <Text style={styles.buttonBottomText}>Terapkan</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}
export default FilterPricesComponent;
