import React, { Component } from 'react';
import { Grid } from 'antd-mobile';
import { ScrollView, View, Text, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import styles from './styles';
import numberFormat from '../../helpers/number-format';
import { DataItem } from 'antd-mobile/lib/grid/PropsType';
import { Category } from '../../bmd';
import { config } from '../../config';

interface ListCategoriesTreeComponentProps {
  categoryChildren?: Category[];
  onPressTerapkan?: any;
}

const colors = {
  1: {
    style: {
      backgroundColor: '#ffffff'
    }
  },
  2: {
    style: {
      backgroundColor: '#ffffff'
    }
  },
  3: {
    style: {
      backgroundColor: '#f5f5f6'
    }
  },
  4: {
    style: {
      backgroundColor: '#e1e3e6'
    }
  }
};

export class ListCategoriesTreeComponent extends Component<ListCategoriesTreeComponentProps, any> {
  constructor(props) {
    super(props);
    this.state = {
      parentCategory: true,
      openChild: []
    };
  }
  selecCategory = category => {
    if (category.children) {
      if (this.state.openChild.includes(category.id)) {
        const { openChild } = this.state;
        const index = openChild.indexOf(category.id);
        if (index > -1) {
          openChild.splice(index, 1);
        }
        this.setState({ openChild });
      } else {
        this.setState({
          openChild: this.state.openChild.concat(category.id)
        });
      }
    } else {
      this.props.onPressTerapkan(category.id);
    }
  };
  _renderChildCategory = children => {
    if (children !== undefined) {
      return (
        <View key={Math.random()}>
          {children.map(category => {
            const level = category.level !== undefined ? category.level : 4;
            const customBg = colors[level]['style'];
            const chevron =
              level === 4 ? <Image source={require('./assets/chevronRight.png')} /> : null;
            const plusMinusIcon = this.state.openChild.includes(category.id) ? (
              <Image source={require('./assets/remove.png')} />
            ) : (
              <Image source={require('./assets/add.png')} />
            );
            let paddingLeft = 0;
            if (level > 2) {
              paddingLeft = 16 * level;
            }
            if (level > 2 && level === 4) {
              paddingLeft = 16 * level + 16;
            }
            return (
              <View key={category.id}>
                <TouchableWithoutFeedback onPress={() => this.selecCategory(category)}>
                  <View style={[styles.listContainerCategory, customBg, { paddingLeft }]}>
                    {level !== 4 && <Text style={styles.plusMinus}>{plusMinusIcon}</Text>}
                    <View style={styles.listLeftCategory}>
                      <View style={[{ flexDirection: 'row' }]}>
                        <Text style={styles.titleListTextCategory} ellipsizeMode="tail">
                          {category.name} ({category.docCount})
                        </Text>
                      </View>
                    </View>
                    <View style={styles.listRightCategory}>
                      <Text style={styles.titleListTextCategory}>{chevron}</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
                {this.state.openChild.includes(category.id) &&
                  this._renderChildCategory(category.children)}
              </View>
            );
          })}
        </View>
      );
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView keyboardShouldPersistTaps="always" showsVerticalScrollIndicator={false}>
          {this._renderChildCategory(this.props.categoryChildren)}
        </ScrollView>
      </View>
    );
  }
}

export default ListCategoriesTreeComponent;
