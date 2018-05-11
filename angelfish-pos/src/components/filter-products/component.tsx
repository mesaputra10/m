import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView, Alert } from 'react-native';
import { Content, List, ListItem } from 'native-base';
import styles from './styles';
import generateUniqKey from '../../helpers/generate-uniq-key';
import { Category, Brand } from '../../bmd';
import config from '../../config';
import { FilterBrands } from '../filter-brands';
import { FilterPrices } from '../filter-prices';
import { numberFormat } from '../../helpers/number-format';
import { Dispatch } from 'redux';

interface FilterProductsComponentProps {
  getCategories?: any;
  setFilterCategory?: any;
  selectedCategoryId?: string;
  selectedCategoryName?: string;
  categories?: Category[];
  search?(keyword, filterParams): Dispatch<any>;
  keyword?: string;
  brands?: any;
  selectedBrands?: any[];
  setShowFilter?: any;
  setShowFilterCategory?: any;
  setShowFilterBrands?: any;
  setShowFilterPrices?: any;
  setChildCategory?: any;
  setChildBrand?: any;
  childCategory?: boolean;
  childBrand?: boolean;
  showFilter?: boolean;
  showFilterPrices?: boolean;
  minPriceRange?: number;
  maxPriceRange?: number;
}
interface FilterProductsComponentState {
  filterPage: boolean;
  dataCategories: Category[];
  childCategory: boolean;
  dataBrands: Brand[];
  childBrand: boolean;
}
export class FilterProductsComponent extends Component<
  FilterProductsComponentProps,
  FilterProductsComponentState
> {
  constructor(props) {
    super(props);
    this.state = {
      filterPage: true,
      dataCategories: [],
      childCategory: false,
      dataBrands: [],
      childBrand: false
    };
  }
  clickCategories = () => {
    this.setState({
      dataCategories: this.props.categories
    });
    this.showFilterCategory();
  };
  clickChildCategory = (category, children) => {
    if (children !== undefined && children.length > 0) {
      this.setState({ dataCategories: children, filterPage: false, childCategory: true });
    } else {
      this.showFilter();
      this.props.setFilterCategory(category.id, category.name);
      this.setState({});
    }
  };
  clickBrands = () => {
    this.setState({
      dataBrands: this.props.brands
    });
    this.showFilterBrands();
  };
  clickPrices = () => {
    this.showFilterPrices();
  };
  onPressTerapkan = () => {
    const { selectedCategoryId, selectedBrands, minPriceRange, maxPriceRange } = this.props;
    let brandId = selectedBrands ? selectedBrands.map(x => x.aggrBrands) : selectedBrands;
    const filterParams = { categoryId: selectedCategoryId, brandId, minPriceRange, maxPriceRange };
    this.props.search(this.props.keyword, filterParams);
    this.hideFilter();
  };
  hideFilter = () => {
    this.props.setShowFilter(false);
    this.props.setShowFilterCategory(false);
    this.props.setShowFilterBrands(false);
    this.props.setShowFilterPrices(false);
    this.props.setChildBrand(false);
    this.props.setChildCategory(false);
  };
  showFilter = () => {
    this.props.setShowFilter(true);
    this.props.setShowFilterCategory(false);
    this.props.setShowFilterBrands(false);
    this.props.setShowFilterPrices(false);
    this.props.setChildBrand(false);
    this.props.setChildCategory(false);
  };
  showFilterCategory = () => {
    this.props.setShowFilter(false);
    this.props.setShowFilterCategory(true);
    this.props.setShowFilterBrands(false);
    this.props.setShowFilterPrices(false);
    this.props.setChildCategory(true);
    this.props.setChildBrand(false);
  };
  showFilterBrands = () => {
    this.props.setShowFilter(false);
    this.props.setShowFilterCategory(false);
    this.props.setShowFilterBrands(true);
    this.props.setShowFilterPrices(false);
    this.props.setChildCategory(false);
    this.props.setChildBrand(true);
  };
  showFilterPrices = () => {
    this.props.setShowFilter(false);
    this.props.setShowFilterCategory(false);
    this.props.setShowFilterBrands(false);
    this.props.setShowFilterPrices(true);
    this.props.setChildCategory(false);
    this.props.setChildBrand(false);
  };
  render() {
    const {
      selectedCategoryId,
      selectedCategoryName,
      selectedBrands,
      categories,
      minPriceRange,
      maxPriceRange
    } = this.props;
    const disableTerapkan =
      selectedCategoryId === '' &&
      selectedBrands.length === 0 &&
      minPriceRange <= 0 &&
      maxPriceRange <= 0;
    const disableTerapkanStyle = disableTerapkan ? { backgroundColor: config.color.grey } : null;
    if (this.props.showFilter) {
      return (
        <View style={styles.container}>
          <View style={styles.contentContainer}>
            <TouchableWithoutFeedback onPress={this.clickCategories}>
              <View style={styles.listContainer}>
                <View style={styles.listLeft}>
                  <Text style={styles.titleListText}>Kategori</Text>
                  {selectedCategoryName && (
                    <Text style={styles.titleListSelected}>{selectedCategoryName}</Text>
                  )}
                  {selectedCategoryName === '' && (
                    <Text style={styles.titleListSelectedDefault}>Semua</Text>
                  )}
                </View>
                <Image source={require('./assets/chevronRight.png')} style={styles.listRight} />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.clickBrands}>
              <View style={styles.listContainer}>
                <View style={styles.listLeft}>
                  <Text style={styles.titleListText}>Brand</Text>
                  {selectedBrands.length > 0 && (
                    <Text style={styles.titleListSelected} numberOfLines={2}>
                      {selectedBrands.map(b => b.brand).join(', ')}
                    </Text>
                  )}
                  {selectedBrands.length === 0 && (
                    <Text style={styles.titleListSelectedDefault}>Semua</Text>
                  )}
                </View>
                <Image source={require('./assets/chevronRight.png')} style={styles.listRight} />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this.clickPrices}>
              <View style={styles.listContainer}>
                <View style={styles.listLeft}>
                  <Text style={styles.titleListText}>Harga</Text>
                  {minPriceRange > 0 &&
                    maxPriceRange > minPriceRange && (
                      <Text style={styles.titleListSelected}>
                        Rp {numberFormat(minPriceRange)} - Rp {numberFormat(maxPriceRange)}
                      </Text>
                    )}
                  {minPriceRange <= 0 &&
                    maxPriceRange <= 0 && (
                      <Text style={styles.titleListSelectedDefault}>Semua</Text>
                    )}
                </View>
                <Image source={require('./assets/chevronRight.png')} style={styles.listRight} />
              </View>
            </TouchableWithoutFeedback>
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
    if (this.props.childCategory) {
      return (
        <View style={styles.container}>
          <ScrollView>
            {this.state.dataCategories.map((category, categoryIndex) => {
              return (
                <TouchableWithoutFeedback
                  onPress={() => this.clickChildCategory(category, category.children)}
                  key={generateUniqKey(categoryIndex)}
                >
                  <View style={styles.listContainer}>
                    <View style={styles.listLeft}>
                      <Text style={styles.titleListText}>
                        {category.name} ({category.docCount})
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </ScrollView>
          {/* <View style={styles.buttonBottomContainer}>
            <TouchableWithoutFeedback onPress={this.onPressTerapkan}>
              <View style={styles.buttonBottomStyle}>
                <Text style={styles.buttonBottomText}>TERAPKAN</Text>
              </View>
            </TouchableWithoutFeedback>
          </View> */}
        </View>
      );
    }
    if (this.props.childBrand) {
      return <FilterBrands brands={this.state.dataBrands} showFilterPage={this.showFilter} />;
    }
    if (this.props.showFilterPrices) {
      return <FilterPrices />;
    }
  }
}
export default FilterProductsComponent;
