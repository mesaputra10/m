import * as React from "react";
import { AsyncStorage, ActivityIndicator, StatusBar, StyleSheet, Text, View } from "react-native";
import { StackNavigator, SwitchNavigator } from "react-navigation";
import SignInScreen from "./src/screens/Signin";
import HomeScreen from "./src/screens/Home";
import WelcomeScreen from "./src/screens/Welcome";
import { LocaleProvider } from "antd-mobile";
import en_US from "antd-mobile/lib/locale-provider/en_US";
import { Provider } from 'react-redux'
import { YellowBox } from "react-native";
import configureStore from './src/store/store.js'
YellowBox.ignoreWarnings(["Warning: componentWillMount", "Warning: componentWillReceiveProps"]);
const store = configureStore();

class HomeScreenOld extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  static navigationOptions = {
    title: "Home"
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.ts to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Text onPress={this._handlePress}>HomeScreen!</Text>
        {/*<Button onClick={this._signOutAsync}>Signout</Button>*/}
      </View>
    );
  }

  _handlePress = () => {
    this.props.navigation.navigate("Home");
  };

  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
}

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
    const userToken = await AsyncStorage.getItem("userToken");

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

const AppStack = StackNavigator({ Home: HomeScreen }, { headerMode: "none" });
const AuthStack = StackNavigator({ SignIn: SignInScreen }, { headerMode: "none" });
const WelcomeStack = StackNavigator({ Welcome: WelcomeScreen }, { headerMode: "none" });

const RootNavigator = SwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
    Welcome: WelcomeStack
  },
  {
    initialRouteName: "AuthLoading"
  }
);

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
