import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { styles } from './styles';

interface Stock {
  available: number;
  locationCode: string;
}

export class StokListComponent extends Component<{ stocks: Stock[] }, any> {
  constructor(props) {
    super(props);
    this.state = {
      selectedOutletId: 0,
    };
  }
  selectOutlet = id => this.setState({ selectedOutletId: id });
  render() {
    const imageChecked = <Image source={require('./assets/radioButtonOn.png')} width={20} />;
    const imageCheck = <Image source={require('./assets/radioButtonOff.png')} width={20} />;
    return (
      <View style={styles.rowStockContainer}>
        <View style={styles.rowYellowStokOutlet}>
          <TouchableWithoutFeedback onPress={() => this.selectOutlet(1)}>
            <View style={styles.radioButtonContainer}>{imageChecked}</View>
          </TouchableWithoutFeedback>
          <Text style={styles.outletName}>Gunung Sahari</Text>
          <Text style={styles.textStatusStokHabis}>Stok Habis</Text>
        </View>
        <View style={styles.rowGreyStokOutlet}>
          <TouchableWithoutFeedback onPress={() => this.selectOutlet(1)}>
            <View style={styles.radioButtonContainer}>{imageCheck}</View>
          </TouchableWithoutFeedback>
          <Text style={styles.outletName}>Wherehouse</Text>
          <Text style={{ flex: 6, fontWeight: '600', fontSize: 14 }}>Stok Tersedia</Text>
        </View>
        <View style={styles.rowDefaultStokOutlet}>
          <TouchableWithoutFeedback onPress={() => this.selectOutlet(1)}>
            <View style={styles.radioButtonContainer}>{imageCheck}</View>
          </TouchableWithoutFeedback>
          <Text style={styles.outletName}>Mangga Dua Mall</Text>
          <Text style={styles.textStatusStokTersedia}>Sisa 5</Text>
        </View>
        <View style={styles.rowGreyStokOutlet}>
          <TouchableWithoutFeedback onPress={() => this.selectOutlet(1)}>
            <View style={styles.radioButtonContainer}>{imageCheck}</View>
          </TouchableWithoutFeedback>
          <Text style={styles.outletName}>Point Square</Text>
          <Text style={styles.textStatusStokTersedia}>Stok Tersedia</Text>
        </View>
      </View>
    );
  }
}

export default StokListComponent;
