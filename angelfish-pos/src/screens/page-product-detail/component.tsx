import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { NavigationScreenProps } from 'react-navigation';

interface PageProductDetailComponentProps extends NavigationScreenProps<any, any> {
  navigation: any,
}

export class PageProductDetailComponent extends Component<PageProductDetailComponentProps, any> {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.title : 'Product Name',
    }
  };
  constructor(props) {
    super(props);
  }
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={{ flex: 1 }}>
        <Text>Page Product Detail</Text>
        <Text>SKU: {params.sku}</Text>
      </View>
    );
  }
}

export default { PageProductDetailComponent };