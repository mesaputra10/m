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
    return (
      <View style={styles.container}>
        <View style={styles.leftColumn}>{this.props.leftColumn}</View>
        <View style={styles.rightColumn}>{this.props.rightColumn}</View>
      </View>
    );
  }
}

export default { LayoutComponent };
