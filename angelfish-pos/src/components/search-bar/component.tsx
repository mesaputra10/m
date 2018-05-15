import React, { Component } from 'react';
import { View, Text, TextInput, Image, TouchableWithoutFeedback } from 'react-native';
import styles from './styles';
import { Icon, Button } from 'native-base';

interface SearchBarProps {
  actionSearch?: any;
  actionCancel?: any;
  autoFocus?: boolean;
  actionSubmitEditing?: any;
}

export class SearchBarComponent extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      showButtonCancel: false
    };
  }
  actionSearch = text => {
    if (text !== '') {
      this.setState({ keyword: text });
      this.props.actionSearch(text);
    }
  };
  actionClear = () => {
    this.setState({ keyword: '' });
  };
  actionCancel = () => {
    this.props.actionCancel();
    this.setState({ showButtonCancel: false });
  };
  actionSubmitEditing = () => {
    this.props.actionSubmitEditing();
  };
  actionOnFocus = () => {
    this.setState({ showButtonCancel: true });
  };
  render() {
    const { autoFocus } = this.props;
    return (
      <View style={styles.searchBrandContainer}>
        <View style={styles.searchBrandWrap}>
          <Icon name="ios-search" style={styles.iconSearch} />
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
export default SearchBarComponent;
