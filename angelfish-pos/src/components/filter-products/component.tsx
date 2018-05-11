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
  openChild: any[];
}
const colors = {
  1: {
    style: {
      backgroundColor: '#ffffff'
    }
  },
  2: {
    style: {
      backgroundColor: '#f5f5f6'
    }
  },
  3: {
    style: {
      backgroundColor: '#eff0f2'
    }
  },
  4: {
    style: {
      backgroundColor: '#e1e3e6'
    }
  }
};

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
      childBrand: false,
      openChild: []
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
  terapkanCategory = () => {
    const { selectedCategoryId, selectedCategoryName, setFilterCategory } = this.props;
    this.showFilter();
    setFilterCategory(selectedCategoryId, selectedCategoryName);
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
  _renderChildCategory = children => {
    if (children !== undefined) {
      return (
        <View>
          {children.map((category, categoryIndex) => {
            const level = category.level !== undefined ? category.level : 4;
            const customBg = colors[level]['style'];
            const imageChevron = this.state.openChild.includes(category.id)
              ? require('./assets/chevronUp.png')
              : require('./assets/chevronDown.png');
            const chevron = level !== 4 ? <Image source={imageChevron} /> : null;

            const imageCheck =
              this.props.selectedCategoryId === category.id ? (
                <Image source={require('./assets/radioButtonOn.png')} width={20} />
              ) : (
                <Image source={require('./assets/radioButtonOff.png')} width={20} />
              );
            return (
              <View key={generateUniqKey(categoryIndex)}>
                <TouchableWithoutFeedback
                  onPress={() => {
                    if (category.children) {
                      this.setState({
                        openChild: this.state.openChild.concat(category.id)
                      });
                    } else {
                      this.props.setFilterCategory(category.id, category.name);
                    }
                  }}
                >
                  <View style={[styles.listContainerCategory, customBg]}>
                    {level === 4 && <View style={styles.circleStyle}>{imageCheck}</View>}
                    <View style={styles.listLeftCategory}>
                      <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.titleListTextCategory} ellipsizeMode="tail">
                          {category.name}
                        </Text>
                        <Text style={styles.categoryCount}> ({category.docCount})</Text>
                      </View>
                    </View>
                    {category.children && (
                      <View style={styles.listRightCategory}>
                        <Text style={styles.titleListTextCategory}>{chevron}</Text>
                      </View>
                    )}
                  </View>
                </TouchableWithoutFeedback>
                {this.state.openChild.includes(category.id) &&
                  this._renderChildCategory(category.children)}
              </View>
            );
          })}
        </View>
      );
    }
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
    const disableTerapkanCategory = this.props.selectedCategoryId == '';
    const disableTerapkanCategoryStyle = disableTerapkanCategory
      ? { backgroundColor: config.color.grey }
      : null;

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
          <ScrollView>{this._renderChildCategory(this.state.dataCategories)}</ScrollView>
          <View style={styles.buttonBottomContainer}>
            <TouchableWithoutFeedback
              onPress={this.terapkanCategory}
              disabled={disableTerapkanCategory}
            >
              <View style={[styles.buttonBottomStyle, disableTerapkanCategoryStyle]}>
                <Text style={styles.buttonBottomText}>TERAPKAN</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
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
