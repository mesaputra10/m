import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Content, List, ListItem } from 'native-base';
import styles from './styles';
import generateUniqKey from '../../helpers/generate-uniq-key';
import { Category, Brand } from '../../bmd';

interface FilterProductsComponentProps {
  getCategories?: any;
  setFilterCategory?: any;
  selectedCategoryId?: string;
  selectedCategoryName?: string;
  categories?: Category[];
  search?: any;
  keyword?: string;
  brands?: Brand[];
  setFilterBrand?: any;
  selectedBrandName?: string;
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
    this.setState({
      dataCategories: this.props.categories,
      filterPage: false,
      childCategory: true,
      childBrand: false
    });
  };
  clickChildCategory = (category, children) => {
    if (children !== undefined && children.length > 0) {
      this.setState({ dataCategories: children, filterPage: false, childCategory: true });
    } else {
      this.props.setFilterCategory(category.id, category.name);
      this.setState({
        filterPage: true,
        childCategory: false,
        childBrand: false
      });
    }
  };
  clickBrands = () => {
    this.setState({
      dataBrands: this.props.brands,
      filterPage: false,
      childBrand: true,
      childCategory: false
    });
  };
  clickChildBrand = (brandId, brandName) => {
    this.props.setFilterBrand(brandId, brandName);
    this.setState({
      filterPage: true,
      childBrand: false,
      childCategory: false
    });
  };
  render() {
    const { selectedCategoryId, selectedCategoryName, selectedBrandName, categories } = this.props;
    if (this.state.filterPage) {
      return (
        <View style={styles.container}>
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
                {selectedBrandName && (
                  <Text style={styles.titleListSelected}>{selectedBrandName}</Text>
                )}
                {selectedBrandName === '' && (
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
        </View>
      );
    }
    if (this.state.childCategory) {
      return (
        <ScrollView style={styles.container}>
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
                  <Image source={require('./assets/chevronRight.png')} style={styles.listRight} />
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
      );
    }
    if (this.state.childBrand) {
      return (
        <ScrollView style={styles.container}>
          {this.state.dataBrands.map((brand, brandIndex) => {
            return (
              <TouchableWithoutFeedback
                onPress={() => this.clickChildBrand(brand.aggrBrands, brand.brand)}
                key={generateUniqKey(brandIndex)}
              >
                <View style={styles.listContainer}>
                  <View style={styles.listLeft}>
                    <Text style={styles.titleListText}>{brand.brand}</Text>
                  </View>
                  <Image source={require('./assets/chevronRight.png')} style={styles.listRight} />
                </View>
              </TouchableWithoutFeedback>
            );
          })}
        </ScrollView>
      );
    }
  }
}
export default FilterProductsComponent;
