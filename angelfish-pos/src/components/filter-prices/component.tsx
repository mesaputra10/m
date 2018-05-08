import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  TextInput,
  ScrollView,
  Alert
} from 'react-native';
import { Content, List, ListItem } from 'native-base';
import styles from './styles';
import generateUniqKey from '../../helpers/generate-uniq-key';
import config from '../../config';
import numberFormat from '../../helpers/number-format';

interface FilterPricesComponentProps {
  setValueFilterPrices?: any;
  showFilterPage?: any;
  setShowFilterPrices?: any;
  setShowFilter?: any;
}

export class FilterPricesComponent extends Component<FilterPricesComponentProps, any> {
  maxInput: {};
  constructor(props) {
    super(props);
    this.state = {
      min: props.priceRange.min || 0,
      max: props.priceRange.max || 0
    };
  }
  onPressTerapkan = () => {
    const { min, max } = this.state;
    this.props.setValueFilterPrices(min, max);
    this.props.setShowFilterPrices(false);
    this.props.setShowFilter(true);
  };
  setValueMin = min => {
    this.setState({ min });
  };
  setValueMax = max => {
    this.setState({ max });
  };
  render() {
    const { min, max } = this.state;
    const disableTerapkan = min === '' || max === '' || parseInt(max) < parseInt(min);
    const disableTerapkanStyle = disableTerapkan ? { backgroundColor: config.color.grey } : null;
    const minValue = min;
    const maxValue = max;
    return (
      <View style={styles.container}>
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
              <Text style={styles.buttonBottomText}>TERAPKAN</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}
export default FilterPricesComponent;
