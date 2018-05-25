import * as React from 'react';
import store from './src/store/store';
import { AsyncStorage, ActivityIndicator, StatusBar, StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Signin } from './src/screens/signin';
import { Home } from './src/screens/home';
import Welcome from './src/screens/Welcome';
import { PageLanding } from './src/screens/page-landing';
import { LocaleProvider } from 'antd-mobile';
import en_US from 'antd-mobile/lib/locale-provider/en_US';
import { Provider } from 'react-redux';
import { YellowBox } from 'react-native';
import { PageCategory } from './src/screens/page-category';
import { PageProductDetail } from './src/screens/page-product-detail';
import { PageOffline } from './src/screens/page-offline';
import { ActionTypes } from './src/store/action-types';
import { registerConnectionChange } from './src/helpers/check-connection';
import { PageServerError } from './src/screens/page-server-error';

YellowBox.ignoreWarnings(['Warning: componentWillMount', 'Warning: componentWillReceiveProps']);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

const RootNavigator = StackNavigator(
  {
    PageLanding: { screen: PageLanding },
    Welcome: { screen: Welcome },
    Auth: { screen: Signin },
    Home: { screen: Home },
    PageCategory: { screen: PageCategory },
    PageProductDetail: { screen: PageProductDetail },
    PageOffline: { screen: PageOffline },
    PageServerError: { screen: PageServerError }
  },
  {
    initialRouteName: 'PageLanding',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false
    }
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
