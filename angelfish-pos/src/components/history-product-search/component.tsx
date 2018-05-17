import React, { Component } from 'react';
import {
  ScrollView,
  View,
  Text,
  AsyncStorage,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Alert
} from 'react-native';
import styles from './styles';
import config from '../../config';
import { uniq } from 'lodash';

export class HistoryProductSearchComponent extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      histories: []
    };
  }
  componentDidMount() {
    setTimeout(() => this.getHistories(), 500);
  }
  getHistories = async () => {
    const histories: string = await AsyncStorage.getItem(config.key.historyProductSearch);
    if (histories !== null) {
      const arrHistories = histories.split(',');
      this.setState({ isLoaded: true, histories: uniq(arrHistories) });
    } else {
      this.setState({ isLoaded: true, histories: [] });
    }
  };
  removeHistories = () => {
    Alert.alert('Konfirmasi!', 'Apakah anda yakin akan menghapus riwayat pencarian?', [
      { text: 'Ya', onPress: () => this.actionRemoveHistories() },
      { text: 'Tidak' }
    ]);
  };
  actionRemoveHistories = async () => {
    this.setState({ isLoaded: false });
    await AsyncStorage.removeItem(config.key.historyProductSearch);
    this.getHistories();
  };
  onPressKeyword = history => {
    const { actionSearch } = this.props;
    actionSearch(history);
  };
  render() {
    const { isLoaded, histories } = this.state;
    if (!isLoaded) {
      return (
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={styles.container}>
            <ActivityIndicator color={config.color.blue} />
          </View>
        </ScrollView>
      );
    }
    return (
      <View style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="always"
          scrollEventThrottle={1000}
        >
          <View>
            <Text style={styles.titleHistoryText}>RIWAYAT PENCARIAN</Text>
            {histories !== null &&
              histories.reverse().map(history => {
                return (
                  <TouchableWithoutFeedback
                    key={history}
                    onPress={() => this.onPressKeyword(history)}
                  >
                    <View>
                      <Text style={styles.historyText}>{history}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                );
              })}
            {histories.length > 0 &&
              histories !== null && (
                <TouchableWithoutFeedback onPress={this.removeHistories}>
                  <View>
                    <Text style={styles.removeHistoryText}>Hapus Semua</Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default HistoryProductSearchComponent;
