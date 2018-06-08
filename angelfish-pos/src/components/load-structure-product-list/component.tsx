import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { styles } from './styles';
export class LoadStructureProductListComponent extends Component {
  renderItem = (element, index) => {
    return (
      <View style={styles.itemContainer} key={element}>
        <View style={styles.imageBlock} />
        <View style={styles.title} />
        <View style={styles.title2} />
        <View style={styles.title3} />
        <View style={styles.title4} />
        <View style={styles.button} />
      </View>
    );
  };
  render() {
    const data = [1, 2, 3, 4, 5, 6];
    return <View style={styles.container}>{data.map((v, i) => this.renderItem(v, i))}</View>;
  }
}
export default LoadStructureProductListComponent;
