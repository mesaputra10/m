import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import { isOffline } from '../../helpers/check-connection';

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
  componentWillMount() {
    isOffline(this.props.navigation);
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
