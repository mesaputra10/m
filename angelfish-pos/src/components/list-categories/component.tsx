import React, { Component } from 'react';
import { Grid } from 'antd-mobile';
import { ScrollView, View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import numberFormat from '../../helpers/number-format';
import { NavigationScreenProps } from 'react-navigation';
import { DataItem } from 'antd-mobile/lib/grid/PropsType';
import { Category } from '../../bmd';

interface ListCategoriesComponentProps extends NavigationScreenProps {
  categories: Category[];
}

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
      <ScrollView>
        <Grid
          data={this.props.categories}
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
      </ScrollView>
    );
  }
}
