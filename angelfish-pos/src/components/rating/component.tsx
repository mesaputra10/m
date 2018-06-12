import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';

export class RatingComponent extends Component<any, any> {
  constructor(props) {
    super(props);
  }
  render() {
    const { totalRating, totalReview } = this.props;
    const rating = totalRating === undefined ? 0 : totalRating;
    const review = totalReview === undefined ? 0 : totalReview;
    const allRating = [1, 2, 3, 4, 5];
    return (
      <View style={styles.ratingContainer}>
        {allRating.map(r => {
          if (r <= rating) {
            return <Image key={r} source={require('./assets/full.png')} />;
          }
          return <Image key={r} source={require('./assets/stroke.png')} />;
        })}
        <Text style={{ paddingLeft: 4 }}>({review})</Text>
      </View>
    );
  }
}
export default RatingComponent;
