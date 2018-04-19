import * as React from "react";
import Expo from "expo";
import { AsyncStorage, StyleSheet, View, Text, Alert, ScrollView, Image } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Button, Divider } from "react-native-elements";
import { SearchBar, Grid, List } from "antd-mobile";
import { DataItem } from "antd-mobile/lib/grid/PropsType";

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
              onClick={() => {console.log("list item click")}}
            >
              <View style={styles.searchResultListItemContainer}>
                <View style={styles.searchResultListItemLeft}>
                  <Image
                    source={{ uri: 'https://assets.bmdstatic.com/assets/Data/image_product_500x500/5a6700f5b59fd.jpg' }}
                    style={styles.searchResultImage}
                  />
                </View>
                <View style={styles.searchResultListItemRight}>
                  <Text style={styles.searchResultText}>SAMSUNG Galaxy J7 Pro - Black</Text>
                  <View style={styles.searchResultPriceContainer}>
                    <Text style={[styles.searchResultText, {textDecorationLine: 'line-through', paddingRight: 5}]}>Rp. 4.000.000</Text>
                    <Text style={styles.searchResultDiscountText}> -5%</Text>
                  </View>
                  <Text style={styles.searchResultText}>Rp 3.799.000</Text>
                </View>
              </View>
            </Item>
            <Item
              multipleLine
              onClick={() => {console.log("list item click")}}
            >
              <View style={styles.searchResultListItemContainer}>
                <View style={styles.searchResultListItemLeft}>
                  <Image
                    source={{ uri: 'https://assets.bmdstatic.com/assets/Data/image_product_500x500/5a6700f5b59fd.jpg' }}
                    style={styles.searchResultImage}
                  />
                </View>
                <View style={styles.searchResultListItemRight}>
                  <Text style={styles.searchResultText}>SAMSUNG Galaxy J2 Prime [SM-G532] - Gold/White Gold</Text>
                  <View style={styles.searchResultPriceContainer}>
                    <Text style={[styles.searchResultText, {textDecorationLine: 'line-through', paddingRight: 5}]}>Rp. 1.599.999</Text>
                    <Text style={styles.searchResultDiscountText}> -5%</Text>
                  </View>
                  <Text style={styles.searchResultText}>Rp. 1.550.000</Text>
                </View>
              </View>
            </Item>
            <Item
              multipleLine
              onClick={() => {console.log("list item click")}}
            >
              <View style={styles.searchResultListItemContainer}>
                <View style={styles.searchResultListItemLeft}>
                  <Image
                    source={{ uri: 'https://assets.bmdstatic.com/assets/Data/image_product_500x500/5a6700f5b59fd.jpg' }}
                    style={styles.searchResultImage}
                  />
                </View>
                <View style={styles.searchResultListItemRight}>
                  <Text style={styles.searchResultText}>MERTUA Sambel Bawang Level Pedas 5 180gr [SM02]</Text>
                  <Text style={styles.searchResultEmptyStockText}>Stok Habis</Text>
                </View>
              </View>
            </Item>
          </List>
        </View> 
      );
    }
  }
  onChangeTextSearch = (text) => {
    setTimeout(() => {
      if (text.length >= 3) {
        this.setState({ searchAutoComplete: true });
      }
    }, 500);
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerColumn}>
          <View style={styles.leftPart}>
            <View style={{ padding: 10 }}>
              <SearchBar
                cancelText="Batal"
                placeholder="Cari"
                maxLength={50}
                onChange={this.onChangeTextSearch}
                onCancel={() => this.setState({ searchAutoComplete: false })}
              />
            </View>
            <ScrollView>
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
            </ScrollView>
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
    flexDirection: 'column',
    justifyContent: "space-between",
  },
  titleRight: {
    paddingTop: 16,
    paddingBottom: 31,
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
  searchResultListItemContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  searchResultListItemLeft: {
    flex: 2,
  },
  searchResultImage: {
    width: 85,
    height: 100,
  },
  searchResultListItemRight: {
    flex: 9,
    paddingTop: 10,
    paddingBottom: 10,
  },
  searchResultText: {
    fontSize: 16,
  },
  searchResultPriceContainer: {
    flexDirection: 'row',
    paddingTop: 15,
  },
  searchResultDiscountText: {
    fontSize: 16,
    color: 'red',
  },
  searchResultEmptyStockText: {
    fontSize: 16,
    color: 'red',
    paddingTop: 16,
  },
});
