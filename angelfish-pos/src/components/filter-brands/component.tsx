import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView, TextInput } from 'react-native';
import { Content, List, ListItem, Header, Icon } from 'native-base';
import styles from './styles';
import generateUniqKey from '../../helpers/generate-uniq-key';
import config from '../../config';
import { setShowFilterBrands } from '../../screens/home/action';

interface FilterBrandsComponentProps {
  brands: any[];
  setFilterBrands?: any;
  selectedBrands?: any[];
  showFilterPage: any;
  setShowFilterBrands?: any;
  setShowFilter?: any;
  showFilterBrands?: boolean;
  showSearchBrands?: boolean;
  setShowSearchBrands?: any;
}

export class FilterBrandsComponent extends Component<FilterBrandsComponentProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      dataBrands: props.brands,
      keyword: ''
    };
  }
  componentDidMount() {}
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
    this.props.showFilterPage();
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
  render() {
    const { showFilterBrands, selectedBrands, showSearchBrands } = this.props;
    let brands = this.props.brands;
    if (showSearchBrands) {
      brands = this.state.dataBrands;
    }
    const disableTerapkan = selectedBrands.length < 1;
    const disableTerapkanStyle = disableTerapkan ? { backgroundColor: config.color.grey } : null;
    console.log(showSearchBrands, 'showSearchBrands');
    return (
      <View style={styles.container}>
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
