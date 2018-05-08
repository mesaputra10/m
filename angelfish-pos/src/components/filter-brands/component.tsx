import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Content, List, ListItem } from 'native-base';
import styles from './styles';
import generateUniqKey from '../../helpers/generate-uniq-key';
import config from '../../config';
import { setShowFilterBrands } from '../../screens/home/action';

interface FilterBrandsComponentProps {
  brands: any[];
  setFilterBrands?: any;
  selectedBrands?: any[];
  clickChildBrand: any;
  setShowFilterBrands?: any;
  setShowFilter?: any;
  showFilterBrands?: boolean;
}

export class FilterBrandsComponent extends Component<FilterBrandsComponentProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      dataBrands: [] || props.brands
    };
  }
  clickChildBrand = brand => {
    let selectedBrandsNew = [...this.props.selectedBrands];
    if (selectedBrandsNew.includes(brand)) {
      selectedBrandsNew.map((b, bIndex) => {
        if (b.aggrBrands == brand.aggrBrands) {
          selectedBrandsNew.splice(bIndex, 1);
        }
      });
    } else {
      selectedBrandsNew = [...selectedBrandsNew, brand];
    }
    this.props.setFilterBrands(selectedBrandsNew);
  };

  onPressTerapkan = () => {
    this.props.setFilterBrands([]);
    const selectedBrands = this.props.selectedBrands;
    this.props.setFilterBrands(selectedBrands);
    this.props.clickChildBrand();
    this.props.setShowFilterBrands(false);
    this.props.setShowFilter(true);
  };
  render() {
    const { brands, showFilterBrands, selectedBrands } = this.props;
    const disableTerapkan = selectedBrands.length < 1;
    const disableTerapkanStyle = disableTerapkan ? { backgroundColor: config.color.grey } : null;

    return (
      <View style={styles.container}>
        <ScrollView>
          {brands.map((brand, brandIndex) => {
            const circleColor = selectedBrands.includes(brand)
              ? config.color.blue
              : config.color.white;
            const borderColor = selectedBrands.includes(brand)
              ? config.color.blue
              : config.color.border;
            const imageCheck = selectedBrands.includes(brand) ? (
              <Image source={require('./assets/checkboxOn.png')} width={20} />
            ) : null;
            return (
              <TouchableWithoutFeedback
                onPress={() => this.clickChildBrand(brand)}
                key={generateUniqKey(brandIndex)}
              >
                <View style={styles.listContainer}>
                  <View style={styles.brandContainer}>
                    <View
                      style={[styles.circleStyle, { backgroundColor: circleColor, borderColor }]}
                    >
                      {imageCheck}
                    </View>
                    <Text style={styles.titleListText}>{brand.brand}</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
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
export default FilterBrandsComponent;
