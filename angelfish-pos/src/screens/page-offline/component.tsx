import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
  Alert,
  ActivityIndicator,
  NetInfo
} from 'react-native';
import styles from './styles';
import store from '../../store/store';
import { isOffline, registerConnectionChange, isOnline } from '../../helpers/check-connection';

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
  shouldComponentUpdate(nextProps) {
    if (nextProps.isConnected !== this.props.isConnected) {
      return true;
    }
    return false;
  }
  componentDidUpdate() {
    setTimeout(() => {
      this.setState({ loading: false });
      isOnline(this.props);
    }, 1000);
  }
  tryAgain = () => {
    this.setState({ loading: true });
    registerConnectionChange();
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
