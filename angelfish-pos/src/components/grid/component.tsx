import React, { Component } from 'react';
import { View } from 'react-native';
import { Grid } from 'antd-mobile';
import { styles } from './styles';

export class GridComponent extends Component<any, any> {
  render() {
    const { data, renderItem } = this.props;
    return (
      <View style={styles.container}>
        {data.map((elemen, index) => {
          return (
            <View style={styles.containerItem} key={index}>
              {renderItem(elemen, index)}
            </View>
          );
        })}
      </View>
    );
  }
}
export default GridComponent;
