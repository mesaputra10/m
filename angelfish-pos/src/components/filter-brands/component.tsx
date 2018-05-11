import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView, TextInput } from 'react-native';
import { Content, List, ListItem, Header, Icon } from 'native-base';
import styles from './styles';
import config from '../../config';

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
  componentDidMount() {}
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
    this.setState({ selectedBrands: selectedBrandsNew });
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
    this.setState({ showSearchBrands: !this.state.showSearchBrands, keyword: '' });
  };
  render() {
    const { selectedBrands, showSearchBrands } = this.state;
    let brands = this.props.brands;
    if (showSearchBrands) {
      brands = this.state.dataBrands;
    }
    const disableTerapkan = selectedBrands.length < 1;
    const disableTerapkanStyle = disableTerapkan ? { backgroundColor: config.color.grey } : null;
    return (
      <View style={styles.container}>
        <View style={styles.headerRightFilterContainer}>
          <TouchableWithoutFeedback onPress={this.props.cancelFilterBrands}>
            <View>
              <Text style={styles.filterCancelText}>Batal</Text>
            </View>
          </TouchableWithoutFeedback>
          <Text style={styles.headerRightText}>Brand</Text>
          <TouchableWithoutFeedback onPress={this.showHideSearchBrands}>
            <View style={styles.removeButtonContainer}>
              <Icon
                name="ios-search"
                style={{ fontSize: 24, paddingTop: 16, color: config.color.blue }}
              />
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.deleteFilterBrands}>
            <View style={styles.removeButtonContainer}>
              <Text style={styles.filterDeleteText}>Hapus</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <ScrollView style={styles.contentContainer}>
          {showSearchBrands && (
            <View
              style={{
                height: 40,
                paddingVertical: 8,
                paddingHorizontal: 16
              }}
            >
              <View
                style={{
                  height: 30,
                  backgroundColor: '#f0f0f1',
                  borderRadius: 5,
                  paddingLeft: 8,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Icon name="ios-search" style={{ fontSize: 16 }} />
                <TextInput
                  onChangeText={this.searchBrands}
                  autoFocus={true}
                  placeholder="Cari"
                  returnKeyType="search"
                  value={this.state.keyword}
                  style={{
                    color: config.color.text,
                    fontSize: 16,
                    paddingLeft: 8
                  }}
                />
              </View>
            </View>
          )}
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
