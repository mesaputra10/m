import ActionTypes from '../store/action-types';
import store from '../store/store';
import { NetInfo } from 'react-native';

function handleFirstConnectivityChange(isConnected) {
  console.log('is ' + (isConnected ? 'online' : 'offline'));
  store.dispatch({ type: ActionTypes.GLOBAL_CONNECTION, isConnected });
  NetInfo.isConnected.removeEventListener('connectionChange', handleFirstConnectivityChange);
}
export const checkConnection = async () =>
  await NetInfo.isConnected.addEventListener('connectionChange', handleFirstConnectivityChange);

export const isOffline = async navigation => {
  checkConnection();
  setTimeout(async () => {
    const isConnected = await store.getState().globalReducer.then(red => red.isConnected);
    console.log('store connection: ', isConnected);
    if (!isConnected) {
      navigation.navigate('PageOffline');
    }
  }, 500);
};
