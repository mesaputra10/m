import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, Text, TextInput, Image, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import config from '../../config';

interface SearchBarProps {
  actionSearch?: any;
  actionCancel?: any;
  autoFocus?: boolean;
  actionSubmitEditing?: any;
  actionClear?: any;
  keyword?: string;
}

export class SearchBarComponent extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      keyword: props.keyword,
      showButtonCancel: false
    };
  }
  componentWillReceiveProps(nextProps) {
    const keyword = nextProps.keyword;
    this.setState({ keyword });
  }
  actionSearch = text => {
    if (text !== '') {
      this.setState({ keyword: text });
      this.props.actionSearch(text);
    }
  };
  actionClear = () => {
    this.setState({ keyword: '' });
    this.props.actionClear();
  };
  actionCancel = () => {
    this.setState({ showButtonCancel: false, keyword: '' });
    this.props.actionCancel();
  };
  actionSubmitEditing = () => {
    this.props.actionSubmitEditing();
  };
  actionOnFocus = () => {
    this.setState({ showButtonCancel: true });
    this.props.actionOnFocus();
  };
  render() {
    const { autoFocus } = this.props;
    return (
      <View style={styles.searchBrandContainer}>
        <View style={styles.searchBrandWrap}>
          <Image source={require('./assets/search.png')} style={styles.iconSearch} />
          <TextInput
            autoCorrect={false}
            multiline={false}
            onChangeText={this.actionSearch}
            onSubmitEditing={this.actionSubmitEditing}
            autoFocus={autoFocus}
            placeholder="Cari"
            returnKeyType="search"
            value={this.state.keyword}
            style={styles.searchInputText}
            onFocus={this.actionOnFocus}
          />
          <View style={styles.buttonClearSearch}>
            {this.state.keyword.length > 0 && (
              <TouchableWithoutFeedback onPress={this.actionClear}>
                <View>
                  <Image source={require('./assets/cancel.png')} style={styles.iconCancel} />
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        </View>
        {this.state.showButtonCancel && (
          <View style={styles.searchBrandBatalContainer}>
            <TouchableWithoutFeedback onPress={this.actionCancel}>
              <View style={styles.buttonBatalSearch}>
                <Text style={styles.batalSearchText}>Batal</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
      </View>
    );
  }
}

SearchBarComponent.defaultProps = {
  actionOnFocus: () => {},
  actionCancel: () => {},
  actionClear: () => {},
  actionSearch: () => {},
  actionSubmitEditing: () => {},
  keyword: ''
};

export default SearchBarComponent;
