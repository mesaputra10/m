import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { Layout } from '../../components/layout';
import { ListCategoriesTree } from '../../components/list-categories-tree';
import { Keranjang } from '../../components/keranjang';
import styles from './styles';

interface PageCategoryComponentProps extends NavigationScreenProps<any, any> {
  navigation: any;
}

export class PageCategoryComponent extends Component<PageCategoryComponentProps, any> {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.title : 'Category Name'
    };
  };
  constructor(props) {
    super(props);
    this.props.navigation.setParams({
      hideHeader: false
    });
  }
  render() {
    const { params } = this.props.navigation.state;
    const leftColumn = <ListCategoriesTree categoryChildren={params.categoryChildren} />;
    const rightColumn = <Keranjang navigation={this.props.navigation} />;
    return <Layout leftColumn={leftColumn} rightColumn={rightColumn} />;
  }
}

export default { PageCategoryComponent };
