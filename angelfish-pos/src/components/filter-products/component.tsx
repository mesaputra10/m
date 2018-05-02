import React, { Component } from 'react';
import { View, Text, Image, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Content, List, ListItem } from 'native-base';
import styles from './styles';
import generateUniqKey from '../../helpers/generate-uniq-key';

interface FilterProductsComponentProps {
  getCategories: any;
  setFilterCategory: any;
  selectedCategoryId: string;
  selectedCategoryName: string;
  categories: any;
  search: any;
  keyword: string;
}

export class FilterProductsComponent extends Component<FilterProductsComponentProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      filterPage: true,
      childCategory: false,
      dataCategories: []
    };
  }
  componentDidMount() {
    this.props.getCategories();
  }
  clickCategories = async () => {
    const dataCategories = this.props.categories;
    this.setState({ dataCategories, filterPage: false, childCategory: true });
  };
  clickChildCategory = (category, children) => {
    if (children !== undefined && children.length > 0) {
      this.setState({ dataCategories: children, filterPage: false, childCategory: true });
    } else {
      this.props.setFilterCategory(category.id, category.name);
      this.setState({
        filterPage: true
      });
    }
  };
  getProducts = () => {
    const { selectedCategoryId } = this.props;
    const filterParams = { categoryId: selectedCategoryId };
    this.props.search(this.props.keyword, filterParams);
  };
  render() {
    if (this.state.filterPage) {
      const { selectedCategoryId, selectedCategoryName } = this.props;
      return (
        <View style={styles.container}>
          <TouchableWithoutFeedback onPress={this.clickCategories}>
            <View style={styles.listContainer}>
              <View style={styles.listLeft}>
                <Text style={styles.titleListText}>Kategori</Text>
                {selectedCategoryName && (
                  <Text style={styles.titleListSelected}>{selectedCategoryName}</Text>
                )}
              </View>
              <Image source={require('./assets/chevronRight.png')} style={styles.listRight} />
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.listContainer}>
            <View style={styles.listLeft}>
              <Text style={styles.titleListText}>Brand</Text>
              <Text style={styles.titleListSelectedDefault}>Semua</Text>
            </View>
            <Image source={require('./assets/chevronRight.png')} style={styles.listRight} />
          </View>
          <View style={styles.listContainer}>
            <View style={styles.listLeft}>
              <Text style={styles.titleListText}>Harga</Text>
              <Text style={styles.titleListSelectedDefault}>Semua</Text>
            </View>
            <Image source={require('./assets/chevronRight.png')} style={styles.listRight} />
          </View>
          <View style={{ padding: 16, alignItems: 'flex-end' }}>
            <TouchableWithoutFeedback onPress={this.getProducts}>
              <View style={{ backgroundColor: 'blue', padding: 16 }}>
                <Text style={{ color: '#fff' }}>TERAPKAN</Text>
              </View>
            </TouchableWithoutFeedback>
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
                    <Text style={styles.titleListText}>{category.name}</Text>
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
