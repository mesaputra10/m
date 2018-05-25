import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image, TouchableWithoutFeedback } from 'react-native';
import { styles } from './styles';

export class RatingComponent extends Component<any, any> {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.ratingContainer}>
        <Image source={require('./assets/full.png')} />
        <Image source={require('./assets/full.png')} />
        <Image source={require('./assets/full.png')} />
        <Image source={require('./assets/full.png')} />
        <Image source={require('./assets/stroke.png')} />
        <Text style={{ paddingLeft: 4 }}>(31)</Text>
      </View>
    );
  }
}
export default RatingComponent;
