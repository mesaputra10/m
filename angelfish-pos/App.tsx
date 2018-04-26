import * as React from 'react';
import store from './src/store/store';
import { AsyncStorage, ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Signin } from './src/screens/signin';
import { Home } from './src/screens/home';
import Welcome from './src/screens/Welcome';
import { LocaleProvider } from 'antd-mobile';
import en_US from 'antd-mobile/lib/locale-provider/en_US';
import { Provider } from 'react-redux';
import { YellowBox } from 'react-native';
import { PageCategory } from './src/screens/page-category';
import { PageProductDetail } from './src/screens/page-product-detail';
import { PageOffline } from './src/screens/page-offline';
import { ActionTypes } from './src/store/action-types';
import { registerConnectionChange } from './src/helpers/check-connection';

YellowBox.ignoreWarnings(['Warning: componentWillMount', 'Warning: componentWillReceiveProps']);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

class AuthLoadingScreen extends React.Component<any> {
  static navigationOptions = {
    header: null
  };

  constructor(props: any) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const keyAccessToken = '@KeyAccessToken';
    const keyRefreshToken = '@KeyRefreshToken';

    const userToken = await AsyncStorage.getItem(keyAccessToken);
    const refreshToken = await AsyncStorage.getItem(keyRefreshToken);
    console.log('userToken: ', userToken);
    console.log('refreshToken: ', refreshToken);

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'Home' : 'Welcome');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const RootNavigator = StackNavigator(
  {
    AuthLoading: { screen: AuthLoadingScreen },
    Welcome: { screen: Welcome },
    Auth: { screen: Signin },
    Home: { screen: Home },
    PageCategory: { screen: PageCategory },
    PageProductDetail: { screen: PageProductDetail },
    PageOffline: { screen: PageOffline }
  },
  {
    initialRouteName: 'AuthLoading'
  }
);

registerConnectionChange();

const App = () => (
  <Provider store={store}>
    <LocaleProvider locale={en_US}>
      <RootNavigator />
    </LocaleProvider>
  </Provider>
);
export default App;
