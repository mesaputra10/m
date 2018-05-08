import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView, Alert } from 'react-native';
import { Content, List, ListItem } from 'native-base';
import styles from './styles';
import generateUniqKey from '../../helpers/generate-uniq-key';
import { Category, Brand } from '../../bmd';
import config from '../../config';
import { FilterBrands } from '../filter-brands';

interface FilterProductsComponentProps {
  getCategories?: any;
  setFilterCategory?: any;
  selectedCategoryId?: string;
  selectedCategoryName?: string;
  categories?: Category[];
  search?: any;
  keyword?: string;
  brands?: any;
  selectedBrands?: any[];
  setShowFilter?: any;
  setShowFilterCategory?: any;
  setShowFilterBrands?: any;
  setChildCategory?: any;
  setChildBrand?: any;
  childCategory?: boolean;
  childBrand?: boolean;
  showFilter?: boolean;
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
  componentDidMount() {
    this.props.getCategories();
  }
  // TODO: may error if action CATEGORIES_LIST still fetching data
  clickCategories = () => {
    this.props.setShowFilterCategory(true);
    this.props.setShowFilterBrands(false);
    this.props.setShowFilter(false);
    this.setState({
      dataCategories: this.props.categories
    });
    this.props.setChildCategory(true);
  };
  clickChildCategory = (category, children) => {
    if (children !== undefined && children.length > 0) {
      this.setState({ dataCategories: children, filterPage: false, childCategory: true });
    } else {
      this.props.setShowFilter(true);
      this.props.setShowFilterCategory(false);
      this.props.setShowFilterBrands(false);
      this.props.setFilterCategory(category.id, category.name);
      this.setState({});
    }
  };
  clickBrands = () => {
    this.props.setShowFilterBrands(true);
    this.props.setShowFilterCategory(false);
    this.props.setShowFilter(false);
    this.setState({
      dataBrands: this.props.brands
    });
    this.props.setChildBrand(true);
    this.props.setChildCategory(false);
  };
  clickChildBrand = (): void => {
    this.props.setShowFilter(false);
  };
  onPressTerapkan = () => {
    this.props.setShowFilterCategory(false);
    const { selectedCategoryId, brands } = this.props;
    const filterParams = { categoryId: selectedCategoryId, brands };
    this.props.search(this.props.keyword, 1, filterParams);
    this.props.setShowFilter(false);
  };
  render() {
    const { selectedCategoryId, selectedCategoryName, selectedBrands, categories } = this.props;
    const disableTerapkan = selectedCategoryId === '' && selectedBrands.length === 0;
    const disableTerapkanStyle = disableTerapkan ? { backgroundColor: config.color.grey } : null;
    if (this.props.showFilter) {
      return (
        <View style={styles.container}>
          <ScrollView>
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
            <View style={styles.listContainer}>
              <View style={styles.listLeft}>
                <Text style={styles.titleListText}>Harga</Text>
                <Text style={styles.titleListSelectedDefault}>Semua</Text>
              </View>
              <Image source={require('./assets/chevronRight.png')} style={styles.listRight} />
            </View>
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
      return <FilterBrands brands={this.state.dataBrands} clickChildBrand={this.clickChildBrand} />;
    }
  }
}
export default FilterProductsComponent;
