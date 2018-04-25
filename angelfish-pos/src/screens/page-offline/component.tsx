import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator
} from 'react-native';
import styles from './styles';
import store from '../../store/store';
import { checkConnection } from '../../helpers/check-connection';

export class PageOfflineComponent extends Component<any, any> {
  static navigationOptions = {
    header: null,
    mode: 'modal'
  };
  constructor(props) {
    super(props);
    this.state = {
      loading: false
    };
  }
  tryAgain = async () => {
    this.setState({ loading: true });
    await checkConnection();
    setTimeout(async () => {
      const isConnected = await store.getState().globalReducer.then(red => red.isConnected);
      if (isConnected) {
        this.props.navigation.goBack();
      }
      this.setState({ loading: false });
    }, 2000);
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={require('./assets/imErrorNetwork.png')} />
        </View>
        <Text style={styles.titleText}>Tidak Ada Koneksi</Text>
        <Text>Silakan cek jaringan internet Anda.</Text>
        <View style={styles.buttonContainer}>
          <TouchableWithoutFeedback onPress={this.tryAgain} disabled={this.state.loading}>
            <View style={styles.buttonSectionContainer}>
              {!this.state.loading && <Text style={styles.buttonText}>Coba Lagi</Text>}
              {this.state.loading && <ActivityIndicator color="#fff" />}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}
export default PageOfflineComponent;
