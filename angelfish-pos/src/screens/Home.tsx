import * as React from "react";
import { AsyncStorage, StyleSheet, View, Text, Alert } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Button, Divider } from "react-native-elements";
import { SearchBar, Grid, List } from "antd-mobile";
import Expo from "expo";
import { DataItem } from "antd-mobile/lib/grid/PropsType";

const data = Array.from(new Array(3)).map((_val, i) => ({
  icon:
    "https://ae01.alicdn.com/kf/HTB1JG5HntnJ8KJjSszdq6yxuFXao/MIFA-Black-Graffiti-Bluetooth-Speaker-IPX5-Waterproof-Bluetooth-4-2-Wireless-Speaker-Micro-SD-Built-in.jpg",
  text: `name${i}`
}));

const categories: Array<DataItem> = [
  { name: "Aksesoris Komputer" },
  { name: "Desktop & Notebooks" },
  { name: "Alat Tulis & Peralatan Kantor" },
  { name: "Server, Network & Power System" },
  { name: "Tablets & Gadgets" },
  { name: "Foto & Videografi" },
  { name: "Alat Musik & Pro Audio" },
  { name: "Sport & Fitness" },
  { name: "Tablets & Gadgets" },
  { name: "Foto & Videografi" },
  { name: "Alat Musik & Pro Audio" },
  { name: "Sport & Fitness" },
  { name: "Tablets & Gadgets" },
  { name: "Foto & Videografi" },
  { name: "Alat Musik & Pro Audio" },
  { name: "Sport & Fitness" },
];

interface HomeProps extends NavigationScreenProps<any, any> {}
const Item = List.Item;

export default class Home extends React.Component<HomeProps, any> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      searchAutoComplete: false,
    };
  }
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Welcome");
  };
  _renderItem = (el, index) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemBox}>
          <Text style={{ textAlign: 'center' }}>{el.name}</Text>
        </View>
      </View>
    );
  };
  _searchAutoComplete = () => {
    if (this.state.searchAutoComplete) {
      return (
        <View style={{ paddingTop: 5 }}>
          <List>
            <Item
              multipleLine
              thumb="https://assets.bmdstatic.com/assets/Data/image_product_500x500/5a6700f5b59fd.jpg"
              onClick={() => {console.log("list item click")}}
            >
              <View style={{ paddingBottom: 10 }}>
                <Text style={styles.searchResultText}>Laptop Macbook Pro X</Text>
              </View>
              <View>
                <Text style={styles.searchResultText}>Rp. 30.000.000</Text>
                <Text style={styles.searchResultText}>5%</Text>
              </View>
              <Text style={styles.searchResultText}>Rp. 30.000.000</Text>
            </Item>
            <View style={styles.searchResultLine} />
            <Item
              multipleLine
              thumb="https://assets.bmdstatic.com/assets/Data/image_product_500x500/5a6700f5b59fd.jpg"
              onClick={() => {console.log("list item click")}}
            >
              <View style={{ paddingBottom: 10 }}>
                <Text style={styles.searchResultText}>Laptop Macbook Pro X</Text>
              </View>
              <View>
                <Text style={styles.searchResultText}>Rp. 30.000.000</Text>
                <Text style={styles.searchResultText}>5%</Text>
              </View>
              <Text style={styles.searchResultText}>Rp. 30.000.000</Text>
            </Item>
          </List>
        </View> 
      );
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerColumn}>
          <View style={styles.leftPart}>
            <View style={{padding: 10}}>
              <SearchBar
                placeholder="Cari"
                onFocus={() => {
                  this.setState({ blur: { backgroundColor: '#000' } });
                }}
                onChange={(text) => {
                  setTimeout(() => {
                    if (text.length >= 3) {
                      this.setState({ searchAutoComplete: true });
                    }
                  }, 500);
                }}
                onCancel={() => this.setState({ searchAutoComplete: false })}
              />
            </View>
            <View>
              {this._searchAutoComplete()}
              {(!this.state.searchAutoComplete) &&
                <Grid
                  data={categories}
                  itemStyle={{ 
                    width: 145,
                    height: 145,
                  }}
                  onClick={(el, i) => {
                    console.log(`el: ${JSON.stringify(el)} | i: ${i}`);
                  }}
                  renderItem={(el, i) => this._renderItem(el, i)}
                  hasLine={false}
                />
              }
              
            </View>
          </View>
          <View style={styles.rightPart}>
            <View style={styles.titleRight}>
              <Text style={styles.titleRightText}>Keranjang</Text>
            </View>
            <View style={styles.contentContainer}>
              <Button title="Logout" onPress={this._signOutAsync} />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    paddingTop: Expo.Constants.statusBarHeight,
    backgroundColor: "#fff",
  },
  containerColumn: {
    flex: 1,
    flexDirection: "row"
  },
  leftPart: {
    flex: 4,
  },
  rightPart: {
    flex: 2,
  },
  titleRight: {
    paddingTop: 16,
    paddingBottom: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  titleRightText: {
    fontSize: 17,
    color: "rgb(0, 0, 0)",
  },
  contentContainer: {
    paddingTop: 10,
  },
  itemContainer: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
  },
  itemBox: {
    backgroundColor: 'rgb(236, 236, 236)',
    flex: 1,
    padding: 12.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchResultText: {
    fontSize: 16,
  },
  searchResultLine: { 
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
});
