import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, Image } from 'react-native';
import { styles } from './styles';
import { CheckBox } from 'native-base';

interface Stock {
  available: number;
  locationCode: string;
  name: string;
  onHand: number;
  onReserve: number;
}

interface componentProps {
  stocks: Stock[];
  onSelect: any;
}

interface componentState {
  selectedOutletId: string;
}

export class StokListComponent extends Component<componentProps, componentState> {
  constructor(props) {
    super(props);
    this.state = {
      selectedOutletId: '',
    };
  }
  selectOutlet = (id, stockAvailable) => {
    const { onSelect } = this.props;
    this.setState({ selectedOutletId: id });
    onSelect(id, stockAvailable);
  };
  render() {
    const { stocks } = this.props;
    const { selectedOutletId } = this.state;
    const imageChecked = <Image source={require('./assets/radioButtonOn.png')} width={20} />;
    const imageCheck = <Image source={require('./assets/radioButtonOff.png')} width={20} />;
    return (
      <View style={styles.rowStockContainer}>
        {stocks.map((stock, stockIndex) => {
          const displayStock = stock.available > 0 ? 'Sisa ' + stock.onHand : 'Stock Habis';
          const keyStock = stockIndex + '-' + stock.name;
          let styleStock =
            stockIndex % 2 == 0 ? styles.rowGreyStokOutlet : styles.rowDefaultStokOutlet;
          const displayStockStyle = stock.available
            ? styles.textStatusStokTersedia
            : styles.textStatusStokHabis;
          let checkBox = imageCheck;
          //selected outlet
          if (stock.locationCode === selectedOutletId) {
            styleStock = styles.rowYellowStokOutlet;
            checkBox = imageChecked;
          }
          return (
            <View style={styleStock} key={keyStock}>
              <TouchableWithoutFeedback
                // disabled={stock.available === 0}
                onPress={() => this.selectOutlet(stock.locationCode, stock.available)}
              >
                <View style={styles.radioButtonContainer}>{checkBox}</View>
              </TouchableWithoutFeedback>
              <Text style={styles.outletName}>{stock.name}</Text>
              <Text style={displayStockStyle}>{displayStock}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}

export default StokListComponent;
