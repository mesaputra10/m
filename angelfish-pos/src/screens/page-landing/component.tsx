import React, { Component } from 'react';
import { View, ActivityIndicator, AsyncStorage } from 'react-native';
import styles from './styles';
import { isOffline } from '../../helpers/check-connection';

export class PageLandingComponent extends Component<any, any> {
  static navigationOptions = {
    header: null
  };
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }
  componentWillMount() {
    isOffline(this.props);
  }
  shouldComponentUpdate(nextProps) {
    if (nextProps.isConnected !== this.props.isConnected) {
      return true;
    }
  }
  componentDidUpdate() {
    isOffline(this.props);
  }
  _bootstrapAsync = async () => {
    const keyAccessToken = '@KeyAccessToken';
    const keyRefreshToken = '@KeyRefreshToken';
    const userToken = await AsyncStorage.getItem(keyAccessToken);
    const refreshToken = await AsyncStorage.getItem(keyRefreshToken);
    this.props.navigation.navigate(userToken ? 'Home' : 'Welcome');
  };
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="rgb(47, 120, 207)" />
      </View>
    );
  }
}

export default PageLandingComponent;
