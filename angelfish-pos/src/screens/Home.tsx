import * as React from "react";
import { AsyncStorage, StyleSheet, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Button, Divider } from "react-native-elements";
import { SearchBar, Grid } from "antd-mobile";
import Expo from "expo";
import { DataItem } from "antd-mobile/lib/grid/PropsType";

const data = Array.from(new Array(3)).map((_val, i) => ({
  icon:
    "https://ae01.alicdn.com/kf/HTB1JG5HntnJ8KJjSszdq6yxuFXao/MIFA-Black-Graffiti-Bluetooth-Speaker-IPX5-Waterproof-Bluetooth-4-2-Wireless-Speaker-Micro-SD-Built-in.jpg",
  text: `name${i}`
}));

const categories: Array<DataItem> = [
  { text: "Aksesoris Komputer" },
  { text: "Desktop & Notebooks" },
  { text: "Alat Tulis & Peralatan Kantor" },
  { text: "Server, Network & Power System" },
  { text: "Tablets & Gadgets" },
  { text: "Foto & Videografi" },
  { text: "Alat Musik & Pro Audio" },
  { text: "Sport & Fitness" }
];

interface HomeProps extends NavigationScreenProps<any, any> {}

class SearchResult extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return <View />;
  }
}

export default class Home extends React.Component<HomeProps, any> {
  constructor(props: HomeProps) {
    super(props);
  }
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Welcome");
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.leftPart}>
          <SearchBar placeholder="Cari" />
          <Grid data={categories} itemStyle={{ padding: 10 }} />
        </View>
        <View>
          <Button title="Logout" onPress={this._signOutAsync} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingTop: Expo.Constants.statusBarHeight
  },
  leftPart: {
    width: 664,
    flexDirection: "column"
  },
  rightPart: {
    backgroundColor: "gray"
  }
});
