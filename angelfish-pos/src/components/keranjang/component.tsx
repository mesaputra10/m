import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Alert } from 'react-native';
import { styles } from './styles';

interface KeranjangProps {
  showFilter?: boolean;
  _signOutAsync?: any;
}
export class KeranjangComponent extends Component<KeranjangProps, any> {
  render() {
    const { showFilter } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.headerRightFilterContainer}>
          <View style={styles.headerRightContainer}>
            <Text style={styles.headerRightText}>Keranjang</Text>
          </View>
        </View>
        {/* content here */}
        <View style={styles.buttonBottomContainer}>
          {!showFilter && (
            <TouchableWithoutFeedback
              onPress={() =>
                Alert.alert('Konfirmasi!', 'Apakah anda yakin akan keluar?', [
                  { text: 'Ya', onPress: () => this.props._signOutAsync() },
                  { text: 'Tidak' }
                ])
              }
            >
              <View style={styles.buttonBottomStyle}>
                <Text style={styles.buttonBottomText}>LOGOUT</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </View>
    );
  }
}
export default KeranjangComponent;
