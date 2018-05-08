import React, { Component } from 'react';
import { Grid } from 'antd-mobile';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import numberFormat from '../../helpers/number-format';
import { NavigationScreenProps } from 'react-navigation';
import { DataItem } from 'antd-mobile/lib/grid/PropsType';

interface ListCategoriesComponentProps extends NavigationScreenProps {}

const categories: Array<DataItem> = [
  { name: 'Aksesoris Komputer' },
  { name: 'Desktop & Notebooks' },
  { name: 'Alat Tulis & Peralatan Kantor' },
  { name: 'Server, Network & Power System' },
  { name: 'Tablets & Gadgets' },
  { name: 'Foto & Videografi' },
  { name: 'Alat Musik & Pro Audio' },
  { name: 'Sport & Fitness' }
];

export class ListCategoriesComponent extends Component<ListCategoriesComponentProps, any> {
  constructor(props) {
    super(props);
  }
  _renderItem = (el, index) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemBox}>
          <Text style={{ textAlign: 'center' }}>{el.name}</Text>
        </View>
      </View>
    );
  };
  render() {
    return (
      <Grid
        data={categories}
        itemStyle={{
          width: 145,
          height: 145
        }}
        onClick={(el, i) => {
          const passProps = { title: el.name };
          this.props.navigation.navigate('PageCategory', passProps);
        }}
        renderItem={(el, i) => this._renderItem(el, i)}
        hasLine={false}
      />
    );
  }
}
