import React, { Component, ComponentState } from 'react';
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
import { AppLoading, Asset, Font } from 'expo';
import { Ionicons } from '@expo/vector-icons';
import component from './src/components/layout/component';

YellowBox.ignoreWarnings(['Warning: componentWillMount', 'Warning: componentWillReceiveProps']);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
    PageServerError: { screen: PageServerError },
  },
  {
    initialRouteName: 'PageLanding',
    headerMode: 'none',
    navigationOptions: {
      gesturesEnabled: false,
    },
  },
);

registerConnectionChange();

const componentState = {
  isLoadingComplete: false,
};

export class App extends Component<any, typeof componentState> {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
    };
  }
  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/ilLoginGetAccess.png'),
        require('./src/screens/signin/assets/on.png'),
        require('./src/screens/signin/assets/off.png'),
        require('./src/screens/home/assets/backArrow.png'),
        require('./src/screens/home/assets/cancel.png'),
        require('./src/screens/home/assets/icGreyNoImage.png'),
        require('./src/screens/page-offline/assets/imErrorNetwork.png'),
        require('./src/screens/page-server-error/assets/im500ErrorGrey128Dp.png'),
        require('./src/screens/page-product-detail/assets/backArrow.png'),
        require('./src/screens/page-product-detail/assets/bank.png'),
        require('./src/screens/page-product-detail/assets/check.png'),
        require('./src/screens/page-product-detail/assets/chevronDown.png'),
        require('./src/screens/page-product-detail/assets/icGreyNoImage.png'),
        require('./src/screens/page-product-detail/assets/list.png'),
        require('./src/screens/page-product-detail/assets/triangle.png'),
        require('./src/screens/page-product-detail/assets/verified.png'),
        require('./src/screens/page-product-detail/assets/warehouse.png'),
        require('./src/components/list-categories-tree/assets/add.png'),
        require('./src/components/list-categories-tree/assets/chevronRight.png'),
        require('./src/components/list-categories-tree/assets/remove.png'),
        require('./src/components/list-products/assets/check.png'),
        require('./src/components/list-products/assets/chevronDown.png'),
        require('./src/components/list-products/assets/filter.png'),
        require('./src/components/list-products/assets/triangle.png'),
        require('./src/components/list-products/assets/icGreyNoImage.png'),
        require('./src/components/filter-categories/assets/chevronDown.png'),
        require('./src/components/filter-categories/assets/chevronRight.png'),
        require('./src/components/filter-categories/assets/chevronUp.png'),
        require('./src/components/filter-categories/assets/radioButtonOff.png'),
        require('./src/components/filter-categories/assets/radioButtonOn.png'),
        require('./src/components/filter-brands/assets/cancel.png'),
        require('./src/components/filter-brands/assets/checkboxOn.png'),
        require('./src/components/filter-brands/assets/search.png'),
        require('./src/components/search-bar/assets/cancel.png'),
        require('./src/components/search-bar/assets/search.png'),
        require('./src/components/search-result-list/assets/icGreyNoImage.png'),
        require('./src/components/stok-list/assets/radioButtonOff.png'),
        require('./src/components/stok-list/assets/radioButtonOn.png'),
        require('./src/components/products-not-found/assets/imProductEmptyGrey128Dp.png'),
        require('./src/components/rating/assets/full.png'),
        require('./src/components/rating/assets/stroke.png'),
        require('./src/components/history-product-search/assets/icGreyNoImage.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        // 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };
  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };
  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
          <LocaleProvider locale={en_US}>
            <RootNavigator />
          </LocaleProvider>
        </Provider>
      );
    }
  }
}

export default App;
