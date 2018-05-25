import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableWithoutFeedback } from 'react-native';
import { styles } from '../styles';
import config from '../../../config';

interface componentProps {
  summary: string;
  content: string;
  selengkapnya: boolean;
  setSelengkapnya: any;
}

export class ContentWrap extends Component<componentProps, any> {
  constructor(props) {
    super(props);
  }
  render() {
    const { summary, content, selengkapnya, setSelengkapnya } = this.props;
    return (
      <View>
        <View style={styles.contentContainer}>
          {!selengkapnya && <Text style={styles.contentStyle}>{summary}...</Text>}
          {selengkapnya && <Text style={styles.contentStyle}>{content}</Text>}
        </View>
        {!selengkapnya && (
          <TouchableWithoutFeedback onPress={() => setSelengkapnya()}>
            <View style={styles.selengkapnyaContainer}>
              <Text style={styles.selengkapnya}>Selengkapnya</Text>
            </View>
          </TouchableWithoutFeedback>
        )}
      </View>
    );
  }
}
ContentWrap.propTypes = {
  summary: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  selengkapnya: PropTypes.bool,
  setSelengkapnya: PropTypes.func
};
ContentWrap.defaultProps = {
  selengkapnya: false,
  setSelengkapnya: () => {}
};
export default ContentWrap;
