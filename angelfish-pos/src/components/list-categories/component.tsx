import React, { Component } from 'react';
import { Grid } from 'antd-mobile';
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
    const filterParams = { categoryId };
    this.props.search(filterParams);
    this.props.setShowSearchResults(true);
    this.setState({ parentCategory: true });
  };
  render() {
    const { showParentCategory } = this.props;
    if (showParentCategory) {
      return (
        <ScrollView keyboardShouldPersistTaps="always">
          <Grid
            data={this.props.categories}
            itemStyle={{
              width: 145,
              height: 145
            }}
            onClick={category => this.clickParentCategory(category)}
            renderItem={(el, i) => this._renderItem(el, i)}
            hasLine={false}
          />
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
