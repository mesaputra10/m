import React, { Component } from "react";
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { NavigationScreenProps } from "react-navigation";

interface PageCategoryComponentProps extends NavigationScreenProps<any, any> {
  navigation: any,
}

export class PageCategoryComponent extends Component<PageCategoryComponentProps, any> {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state;
    return {
      title: params ? params.title : 'Category Name',
    }
  };
  constructor(props) {
    super(props);
    this.props.navigation.setParams({
      hideHeader: false,
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text>Page Category</Text>
      </View>
    );
  }
}

export default { PageCategoryComponent };