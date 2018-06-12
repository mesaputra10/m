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
import { FilterCategories } from '../filter-categories';

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
  setChildCategory?: any;
  setChildBrand?: any;
  childCategory?: boolean;
  childBrand?: boolean;
  showFilter?: boolean;
  minPriceRange?: number;
  maxPriceRange?: number;
  cancelFilter?: any;
  deleteFilter?: any;
  cancelFilterCategory?: any;
  deleteFilterCategory?: any;
  cancelFilterBrands?: any;
  deleteFilterBrands?: any;
  cancelFilterPrices?: any;
  deleteFilterPrices?: any;
  setFilterBrands?: any;
}
interface FilterProductsComponentState {
  filterPage: boolean;
  dataCategories: Category[];
  childCategory: boolean;
  dataBrands: Brand[];
  childBrand: boolean;
  openChild: any[];
  showFilterCategory: boolean;
  showFilterBrands: boolean;
  showFilterPrices: boolean;
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
      childBrand: false,
      openChild: [],
      showFilterCategory: false,
      showFilterBrands: false,
      showFilterPrices: false,
    };
  }
  clickCategories = () => {
    this.setState({
      dataCategories: this.props.categories,
      showFilterCategory: true,
      showFilterBrands: false,
      showFilterPrices: false,
    });
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
  clickCancelCategories = () => {
    this.setState({
      dataCategories: this.props.categories,
      showFilterCategory: false,
      showFilterBrands: false,
      showFilterPrices: false,
    });
  };
  terapkanCategory = (selectedCategoryId, selectedCategoryName) => {
    const { setFilterCategory } = this.props;
    setFilterCategory(selectedCategoryId, selectedCategoryName);
  };
  clickBrands = () => {
    this.setState({
      dataBrands: this.props.brands,
      showFilterCategory: false,
      showFilterBrands: true,
      showFilterPrices: false,
    });
  };
  clickCancelBrands = () => {
    this.setState({
      dataBrands: this.props.brands,
      showFilterCategory: false,
      showFilterBrands: false,
      showFilterPrices: false,
    });
  };
  clickPrices = () => {
    this.setState({
      showFilterCategory: false,
      showFilterBrands: false,
      showFilterPrices: true,
    });
  };
  clickCancelPrices = () => {
    this.setState({
      showFilterCategory: false,
      showFilterBrands: false,
      showFilterPrices: false,
    });
  };
  onPressTerapkan = () => {
    const { selectedCategoryId, selectedBrands, minPriceRange, maxPriceRange } = this.props;
    let brandId = selectedBrands ? selectedBrands.map(x => x.aggrBrands) : selectedBrands;
    const filterParams = { categoryId: selectedCategoryId, brandId, minPriceRange, maxPriceRange };
    this.props.search(this.props.keyword, filterParams);
    this.hideFilter();
    this.props.setFilterBrands([]);
  };
  hideFilter = () => {
    this.props.setShowFilter(false);
  };
  showFilter = () => {
    this.props.setShowFilter(true);
  };

  render() {
    const {
      selectedCategoryId,
      selectedCategoryName,
      selectedBrands,
      categories,
      minPriceRange,
      maxPriceRange,
    } = this.props;

    const { showFilterCategory, showFilterBrands, showFilterPrices } = this.state;

    const disableTerapkan =
      selectedCategoryId === '' &&
      selectedBrands.length === 0 &&
      minPriceRange <= 0 &&
      maxPriceRange <= 0;
    const disableTerapkanStyle = disableTerapkan ? { backgroundColor: config.color.grey } : null;
    const filterDeleteText = disableTerapkan
      ? styles.filterDeleteText
      : [styles.filterDeleteText, { color: config.color.blue }];

    if (this.props.showFilter && !showFilterCategory && !showFilterBrands && !showFilterPrices) {
      return (
        <View style={styles.container}>
          <View style={styles.rightColumnTop}>
            <View style={styles.headerRightFilterContainer}>
              <TouchableWithoutFeedback onPress={this.props.cancelFilter}>
                <View>
                  <Text style={styles.filterCancelText}>Batal</Text>
                </View>
              </TouchableWithoutFeedback>
              <Text style={styles.headerRightText}>Filter</Text>
              <TouchableWithoutFeedback onPress={this.props.deleteFilter}>
                <View style={styles.removeButtonContainer}>
                  <Text style={filterDeleteText}>Hapus</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
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
                <Text style={styles.buttonBottomText}>Terapkan</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      );
    }
    if (this.state.showFilterCategory) {
      return (
        <FilterCategories
          selectedCategoryId={this.props.selectedCategoryId}
          clickCancelCategories={this.clickCancelCategories}
          terapkanCategory={this.terapkanCategory}
          dataCategories={this.state.dataCategories}
        />
      );
    }
    if (showFilterBrands) {
      return (
        <FilterBrands brands={this.state.dataBrands} cancelFilterBrands={this.clickCancelBrands} />
      );
    }
    if (showFilterPrices) {
      return (
        <FilterPrices
          cancelFilterPrices={this.clickCancelPrices}
          deleteFilterPrices={this.props.deleteFilterPrices}
        />
      );
    }
  }
}
export default FilterProductsComponent;
