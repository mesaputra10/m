import * as React from "react";
import { AsyncStorage, ActivityIndicator, StatusBar, StyleSheet, Text, View } from "react-native";
import { StackNavigator, SwitchNavigator } from "react-navigation";
import { Signin } from "./src/screens/signin";
import { Home } from "./src/screens/home";
import WelcomeScreen from "./src/screens/Welcome";
import { LocaleProvider } from "antd-mobile";
import en_US from "antd-mobile/lib/locale-provider/en_US";
import { Provider } from 'react-redux'
import { YellowBox } from "react-native";
import store from './src/store/store';
YellowBox.ignoreWarnings(["Warning: componentWillMount", "Warning: componentWillReceiveProps"]);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

class AuthLoadingScreen extends React.Component<any> {
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
    this.props.navigation.navigate(userToken ? "App" : "Welcome");
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

const AppStack = StackNavigator({ Home: Home }, { headerMode: "none" });
const AuthStack = StackNavigator({ SignIn: Signin }, { headerMode: "none" });
const WelcomeStack = StackNavigator({ Welcome: WelcomeScreen }, { headerMode: "none" });

const RootNavigator = SwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: AppStack,
  Auth: AuthStack,
  Welcome: WelcomeStack,
},{
  initialRouteName: "AuthLoading",
});

const App = () => {
  return (
    <Provider store={store}>
      <LocaleProvider locale={en_US}>
        <RootNavigator />
      </LocaleProvider>
    </Provider>
  );
};
export default App;
