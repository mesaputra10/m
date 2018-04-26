import ActionTypes from '../store/action-types';
import store from '../store/store';
import { NetInfo } from 'react-native';

function handleFirstConnectivityChange(isConnected) {
  console.log('your connection is ' + (isConnected ? 'online' : 'offline'));
  store.dispatch({ type: ActionTypes.GLOBAL_CONNECTION, isConnected });
  if (isConnected == false) {
    NetInfo.isConnected.removeEventListener('connectionChange', handleFirstConnectivityChange);
  }
}
export const registerConnectionChange = () =>
  NetInfo.isConnected.addEventListener('connectionChange', handleFirstConnectivityChange);

export const isOffline = props => {
  const isConnected = props.isConnected;
  if (!isConnected) {
    props.navigation.navigate('PageOffline');
  }
};

export const isOnline = props => {
  const isConnected = props.isConnected;
  if (isConnected) {
    props.navigation.goBack();
  }
};
