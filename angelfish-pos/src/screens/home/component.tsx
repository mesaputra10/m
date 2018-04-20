import React from "react";
import Expo from "expo";
import { AsyncStorage, StyleSheet, View, Text, Alert, ScrollView, Image, ActivityIndicator } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Button, Divider } from "react-native-elements";
import { SearchBar, Grid, List } from "antd-mobile";
import { DataItem } from "antd-mobile/lib/grid/PropsType";
import styles from "./styles";
import numberFormat from "../../helpers/number-format";

const categories: Array<DataItem> = [
  { name: "Aksesoris Komputer" },
  { name: "Desktop & Notebooks" },
  { name: "Alat Tulis & Peralatan Kantor" },
  { name: "Server, Network & Power System" },
  { name: "Tablets & Gadgets" },
  { name: "Foto & Videografi" },
  { name: "Alat Musik & Pro Audio" },
  { name: "Sport & Fitness" },
];

interface HomeComponentProps extends NavigationScreenProps<any, any> {}
const Item = List.Item;

export class HomeComponent extends React.Component<HomeComponentProps, any> {
  constructor(props: HomeComponentProps) {
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
  onChangeTextSearch = (text) => {
    if (text.length >= 3) {
      setTimeout(() => {
        this.props.search(text).then(() => this.setState({ searchAutoComplete: true }))
      }, 500);
    }
  };
  render() {
    const products = this.props.products;
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
              {this.state.searchAutoComplete && products.map((product, index) => {
                const productImage = (product.variantImageThumbnail !== "") ? { uri: product.variantImageThumbnail } : require('./assets/icGreyNoImage.png');
                return (
                  <View key={Math.random(index)}>
                    <List>
                      <Item
                        multipleLine
                        onClick={() => {console.log("list item click SKU: ", product.variantSkuNo)}}
                      >
                        <View style={styles.searchResultListItemContainer}>
                          <View style={styles.searchResultListItemLeft}>
                            <Image
                              source={productImage }
                              style={styles.searchResultImage}
                            />
                          </View>
                          <View style={styles.searchResultListItemRight}>
                            <Text style={styles.searchResultText}>{product.productName}</Text>
                            <View style={styles.searchResultPriceContainer}>
                              {product.variantPrice !== product.offerNormalPrice && <Text style={styles.searchResultPriceDiscountText}>Rp. {numberFormat(product.offerNormalPrice)}</Text>}
                              {product.offerDiscountPercentage > 0 && <Text style={styles.searchResultDiscountText}> -{product.offerDiscountPercentage}%</Text>}
                            </View>
                            {product.variantPrice !== product.offerNormalPrice && <Text style={styles.searchResultText}>Rp. {numberFormat(product.offerSpecialPrice)}</Text>}
                            {product.variantPrice === product.offerNormalPrice && <Text style={styles.searchResultText}>Rp. {numberFormat(product.variantPrice)}</Text>}
                          </View>
                        </View>
                      </Item>
                    </List>
                  </View>
                );
              })}
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

export default { HomeComponent };