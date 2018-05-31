import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { NavigationScreenProps } from 'react-navigation';
import styles from './styles';

interface LayoutComponentProps {
  leftColumn?: any;
  rightColumn?: any;
}

export class LayoutComponent extends Component<LayoutComponentProps, any> {
  constructor(props) {
    super(props);
  }
  render() {
    const { leftColumn, rightColumn } = this.props;
    return (
      <View style={styles.container}>
        {leftColumn && <View style={styles.leftColumn}>{leftColumn}</View>}
        {rightColumn && <View style={styles.rightColumn}>{rightColumn}</View>}
      </View>
    );
  }
}

export default { LayoutComponent };
