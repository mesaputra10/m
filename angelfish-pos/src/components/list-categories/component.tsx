import React, { Component } from 'react';
import { Grid } from '../../components/grid';
import { ScrollView, View, Text, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import styles from './styles';
import numberFormat from '../../helpers/number-format';
import { DataItem } from 'antd-mobile/lib/grid/PropsType';
import { Category } from '../../bmd';
import { config } from '../../config';
import { ListCategoriesTree } from '../list-categories-tree';

interface ListCategoriesComponentProps {
  search?: any;
  categories?: Category[];
  setShowSearchResults?: any;
  setShowHeaderCategory?: any;
  setShowParentCategory?: any;
  showParentCategory?: boolean;
}

const colors = {
  1: {
    style: {
      backgroundColor: '#ffffff'
    }
  },
  2: {
    style: {
      backgroundColor: '#ffffff'
    }
  },
  3: {
    style: {
      backgroundColor: '#f5f5f6'
    }
  },
  4: {
    style: {
      backgroundColor: '#e1e3e6'
    }
  }
};

export class ListCategoriesComponent extends Component<ListCategoriesComponentProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      parentCategory: true,
      categoryChildren: []
    };
  }
  clickParentCategory = category => {
    this.props.setShowHeaderCategory(category.name);
    this.props.setShowParentCategory(false);
    this.setState({
      categoryChildren: category.children,
      openChild: []
    });
  };
  _renderItem = (el, index) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemBox}>
          <Text style={{ textAlign: 'center' }}>{el.name}</Text>
        </View>
      </View>
    );
  };
  onPressTerapkan = (categoryId: string) => {
    this.props.search(categoryId);
    this.props.setShowSearchResults(true);
    this.setState({ parentCategory: true });
  };
  renderItemGrid = (element, index) => {
    return (
      <View style={styles.elementContainer}>
        <TouchableWithoutFeedback onPress={() => this.clickParentCategory(element)}>
          <View style={styles.elementContent}>
            <Text style={{ justifyContent: 'center', textAlign: 'center', padding: 8 }}>
              {element.name}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };
  render() {
    const { showParentCategory, categories } = this.props;

    if (showParentCategory) {
      return (
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}
          style={styles.container}
        >
          <Grid data={categories} renderItem={this.renderItemGrid} />
        </ScrollView>
      );
    }
    if (!showParentCategory) {
      return (
        <ListCategoriesTree
          categoryChildren={this.state.categoryChildren}
          onPressTerapkan={this.onPressTerapkan}
        />
      );
    }
  }
}
