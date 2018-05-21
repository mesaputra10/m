import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView, TextInput } from 'react-native';
import { Content, List, ListItem, Header, Icon } from 'native-base';
import styles from './styles';
import config from '../../config';
import { Button } from 'native-base';
import { uniqWith, isEqual } from 'lodash';
import { SearchBar } from '../../components/search-bar';

interface FilterBrandsComponentProps {
  brands: any[];
  setFilterBrands?: any;
  selectedBrands?: any[];
  cancelFilterBrands?: any;
}

export class FilterBrandsComponent extends Component<FilterBrandsComponentProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      dataBrands: props.brands,
      keyword: '',
      selectedBrands: props.selectedBrands,
      showSearchBrands: false
    };
  }
  clickChildBrand = brand => {
    let selectedBrandsNew = [...this.state.selectedBrands];
    if (selectedBrandsNew.includes(brand)) {
      selectedBrandsNew.map((b, bIndex) => {
        if (b.aggrBrands == brand.aggrBrands) {
          selectedBrandsNew.splice(bIndex, 1);
        }
      });
    } else {
      selectedBrandsNew = [...selectedBrandsNew, brand];
    }
    this.setState({ selectedBrands: uniqWith(selectedBrandsNew, isEqual) });
  };
  onPressTerapkan = () => {
    const { selectedBrands } = this.state;
    this.props.setFilterBrands(selectedBrands);
    this.props.cancelFilterBrands();
  };
  searchBrands = text => {
    const { brands } = this.props;
    if (text.length > 0) {
      const search = brands.filter(brand => {
        const brandName = brand.brand.toLowerCase();
        const keyword = text.toLowerCase();
        return brandName.includes(keyword);
      });
      if (search) {
        this.setState({ dataBrands: search, keyword: text });
      }
    }
  };
  deleteFilterBrands = () => {
    this.setState({ selectedBrands: [] });
  };
  showHideSearchBrands = () => {
    this.setState({
      showSearchBrands: !this.state.showSearchBrands,
      keyword: '',
      dataBrands: this.props.brands
    });
  };
  render() {
    const { selectedBrands, showSearchBrands } = this.state;
    let brands = this.props.brands;
    if (showSearchBrands) {
      brands = this.state.dataBrands;
    }
    const disableTerapkan = selectedBrands.length < 1;
    const disableTerapkanStyle = disableTerapkan ? { backgroundColor: config.color.grey } : null;
    const filterDeleteText = disableTerapkan
      ? styles.filterDeleteText
      : [styles.filterDeleteText, { color: config.color.blue }];
    return (
      <View style={styles.container}>
        {!showSearchBrands && (
          <View style={styles.headerRightFilterContainer}>
            <TouchableWithoutFeedback onPress={this.props.cancelFilterBrands}>
              <View>
                <Text style={styles.filterCancelText}>Batal</Text>
              </View>
            </TouchableWithoutFeedback>
            <Text style={styles.headerRightText}>Brand</Text>
            <View style={styles.removeButtonRight}>
              <View style={{ marginLeft: 0 }}>
                <TouchableWithoutFeedback onPress={this.showHideSearchBrands}>
                  <View style={styles.removeButtonContainer}>
                    <Image source={require('./assets/search.png')} style={styles.searchStyle} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={{ paddingLeft: 20 }}>
                <TouchableWithoutFeedback onPress={this.deleteFilterBrands}>
                  <View style={styles.removeButtonContainer}>
                    <Text style={filterDeleteText}>Hapus</Text>
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
          </View>
        )}
        {showSearchBrands && (
          <View style={styles.headerRightFilterContainer}>
            <SearchBar
              actionSearch={this.searchBrands}
              actionCancel={this.showHideSearchBrands}
              autoFocus={true}
            />
          </View>
        )}
        <ScrollView keyboardShouldPersistTaps="always" style={styles.contentContainer}>
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
                key={brand.aggrBrands}
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
